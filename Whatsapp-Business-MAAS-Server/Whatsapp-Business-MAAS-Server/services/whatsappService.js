import axios from 'axios';
import fs from 'fs';

import dotenv from 'dotenv';
dotenv.config();

const tempWA = 2418252531906628;

// TODO: manage the throw err
// ALL recipient numbers should be in international format

// TO gat details of all the buisiness linked with the WABA account
export const getPhoneNumbers = async (businessAccountId) => {
  const url = `https://graph.facebook.com/v22.0/${businessAccountId}/phone_numbers`;
  const accessToken = process.env.WABA_ACCESS_TOKEN;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching phone numbers:', error.response?.data || error.message);
    throw error;
  }
};

// TODO: Reject access if invoice template is not found 
// TODO: not completed yet 
// To send a invoice tpa customer using a predefined template available in their respective WABA accounts
export const sendInvoice = async (businessPhoneNumberId, recipientNumber) => {
    try {
        const url = `https://graph.facebook.com/v18.0/${businessPhoneNumberId}/messages`;
        const accessToken = process.env.WABA_ACCESS_TOKEN;

        const response = await axios.post(
            url,
            {
                messaging_product: 'whatsapp',
                to: recipientNumber,
                type: 'template',
                template: {
                    name: 'invoice_notification', // Replace with your actual template name
                    language: {
                        code: 'en_US'
                    },
                    components: [
                        {
                            type: 'body',
                            parameters: [
                                { type: 'text', text: 'John Doe' },         // Example parameter: customer name
                                { type: 'text', text: 'INV-00123' },         // Invoice number
                                { type: 'text', text: '$129.99' }            // Amount
                            ]
                        }
                    ]
                }
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        console.log('Invoice message sent:', response.data);
    } catch (error) {
        console.error('Failed to send invoice message:', error.response?.data || error.message);
    }
};

// TODO: implement managing 24 hour window
// To send a free form message to client after initialization of conversation through customer
export const sendMessage = async (businessPhoneNumberId, recipientNumber, message) => {
    try {
        const url = `https://graph.facebook.com/v22.0/${businessPhoneNumberId}/messages`;
        const accessToken = process.env.WABA_ACCESS_TOKEN;

        const response = await axios.post(
            url,
            {
                messaging_product: 'whatsapp',
                to: recipientNumber,
                text: { body: message }
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        return response.data;
    } catch (error) {
        console.error('Failed to send invoice message:', error.response?.data || error.message);
    }
};

// TODO: modify according to receive the status of approval
// To send POST to create a template 
export const createTemplate = async (businessAccountId, accessToken, templateData) => {
  const url = `https://graph.facebook.com/v18.0/${businessAccountId}/message_templates`;

  try {
    const response = await axios.post(url, templateData, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error creating template:', error.response?.data || error.message);
    throw error;
  }
};

// TODO: get a way to deal with the limit in getting number of templates form the server`
// To get all the templates available for a WABA
export const getAllTemplates = async (wabaId) => {
    const url = `https://graph.facebook.com/v18.0/${wabaId}/message_templates`;
    const accessToken = process.env.WABA_ACCESS_TOKEN;

    const fields = 'name,language,status';
    const limit = 100;                            

    try {
        const response = await axios.get(
            url,
            {
                params: {
                    fields,
                    limit
                },
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        );

        return response.data;
    } catch (error) {
        console.error('Failed to fetch templates:', error.response?.data || error.message);
        throw error;
    }
};

async function sendTemplateMessage(accessToken, phoneNumberId, recipientNumber, templateName = 'hello_world', languageCode = 'en_US') {
  const url = `https://graph.facebook.com/v15.0/${phoneNumberId}/messages`;
  
  const data = {
    messaging_product: "whatsapp",
    to: recipientNumber,
    type: "template",
    template: {
      name: templateName,
      language: {
        code: languageCode
      }
    }
  };

  try {
    const response = await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('Message sent successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error sending template message:', error.response?.data || error.message);
    throw error;
  }
}

// sendTemplateMessage(process.env.WABA_ACCESS_TOKEN, 678124072049001, '+917904015833')
//   .catch(console.error);

// To upload files to Meta social graph then return HEADER_HANDLE
export const uploadToMetaGraph = async(req, res, next) => {
  const file = req.file;
  if (!file) {
    return res.status(400).json({ error: 'No invoice PDF uploaded.' });
  }

  const filePath = file.path;
  const fileName = file.originalname;
  const fileLength = file.size;
  const fileType = file.mimetype;

  const appId = process.env.WABA_APP_ID;
  const accessToken = process.env.WABA_ACCESS_TOKEN;
  console.log()
  const startUrl = `https://graph.facebook.com/v23.0/${appId}/uploads`;

  try {
    // Start upload session
    const sessionResponse = await axios.post(startUrl, null, {
      params: {
        file_name: fileName,
        file_length: fileLength,
        file_type: fileType,
        access_token: accessToken
      }
    });

    const uploadSessionId = sessionResponse.data.id;

    // Upload the file
    const fileBuffer = fs.readFileSync(filePath);
    const uploadUrl = `https://graph.facebook.com/v23.0/${uploadSessionId}`;

    const uploadResponse = await axios.post(uploadUrl, fileBuffer, {
      headers: {
        'Authorization': `OAuth ${accessToken}`,
        'file_offset': '0',
        'Content-Type': 'application/octet-stream'
      }
    });

    const fileHandle = uploadResponse.data.h;

    // Success: return handle
    return res.status(200).json({ handle: fileHandle });

  } catch (error) {
    console.error('Meta upload failed:', error.response?.data || error.message);
    return res.status(500).json({ error: 'Failed to upload file to Meta Graph API.' });
  }
} 