// SendInvoices.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// import { fetchTemplates } from '../ReduxStates/slices/templateStatsSlice';
// import { fetchCustomers } from '../ReduxStates/slices/customerSlice';
import { fetchTemplates } from '../../ReduxStates/slices/templateStatsSlice.jsx';
import { fetchCustomers } from '../../ReduxStates/slices/customerSlice.jsx';

import WhatsAppPreview from './SendInvoicesComponents/WhatsAppPreview.jsx';
import CustomerSelector from './SendInvoicesComponents/CustomerSelector';
import TemplateSelector from './SendInvoicesComponents/TemplateSelector.jsx';

import { FiSend } from 'react-icons/fi';
import axios from 'axios';
import { CloudCog } from 'lucide-react';

const SendInvoices = () => {
  const dispatch = useDispatch();

  const { items: templates } = useSelector((state) => state.templateStats);
  const { customerList } = useSelector((state) => state.customer);

  const [pdf, setPdf] = useState(null);
  const [customer, setCustomer] = useState('');
  const [template, setTemplate] = useState(null);
  const [params, setParams] = useState({});
  const [uploadedFile, setUploadedFile] = useState(null);

  useEffect(() => {
    dispatch(fetchTemplates('approved'));
    dispatch(fetchCustomers());
  }, [dispatch]);



  const handleSend = async () => {
    // if (!pdf || !customer || !template) {
    //   return alert("Please fill all fields and upload the PDF");
    // }
    console.log(pdf)
    console.log(customer)

    // try {
    //   const formData = new FormData();
    //   formData.append('pdf', pdf); //  PDF file
    //   formData.append('name', customer); //  Customer name
    //   formData.append('customer_phone', '1234567890'); //  Hardcoded for now
    //   formData.append('business_phone', '9876543210'); //  Hardcoded for now
    //   formData.append('invoice_number', 'INV-DEMO-001'); // 🧾 Can make dynamic later
    //   formData.append('message', template?.templateBody || '');

    //   const response = await axios.post('http://localhost:8080/invoice', formData, {
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //     },
    //   });

    //   alert('✅ Invoice sent successfully!');
    //   console.log('Response:', response.data);

    //   // Clear the form (optional)
    //   setPdf(null);
    //   setCustomer('');
    //   setTemplate(null);
    //   setParams({});
    //   setUploadedFile(null);

    // } catch (error) {
    //   console.error(' Error sending invoice:', error);
    //   alert(' Failed to send invoice');
    // }
  };


  return (
    <div className="bg-slate-100 borde min-h-screen p-6">
      <div className=" w-[100%]  borde space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Send Invoice</h1>
        <p className="text-gray-600 mb-6">
          Upload invoice, choose customer, template and preview before sending via WhatsApp.
        </p>

        <div className="grid w-[100%] h-[70vh] borde grid-cols-4 gap-6">
          {/* Left: Customer + Template Selector */}
          <div className="col-span-2  flex flex-col gap-4">
            <CustomerSelector
              customers={customerList}
              selectedCustomer={customer}
              onChange={setCustomer}
            />

            <TemplateSelector
              templates={templates}
              selectedTemplate={template}
              onSelectTemplate={setTemplate}
            />
          </div>

          {/* Right: WhatsApp Preview */}
          <div className=" borde col-span-2">
            <WhatsAppPreview
              selectedTemplate={template || templates[0]}
              selectedCustomer={customer || customerList[0]?.name || ''}
              paramValues={params}
              setParamValues={setParams}
              uploadedFile={uploadedFile}
              setUploadedFile={(file) => {
                setUploadedFile(file); // For UI display
                setPdf(file); // This connects the file to the actual send logic
              }}
            />
          </div>
        </div>



        <div className="text-right borde relative">
          <button
            onClick={handleSend}
            className="bg-black  absolute right-0 hover:bg-black  text-white px-6 py-3 rounded-3xl flex items-center gap-2"
          >
            <FiSend /> Send Invoice
          </button>
        </div>
      </div>
    </div>
  );
};

export default SendInvoices;
