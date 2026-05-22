import templateModel from '../models/templateModel.js';
import credentialModel from '../models/credentialModel.js';
import * as whatsappService from '../services/whatsappService.js'

// Create a new invoice template
export const createInvoiceTemplate = async (req, res, next) => {
    try {
        const user_id = req.user.id;  // user_id is set by auth middleware
        const businessAccountId = req.user.credential.whatsappBusinessId;
        const accessToken = req.user.credential.whatsappAccessToken;

        const {
            category,
            language,
            components,
            parameters
        } = req.body;
        const name = "invoice";
        
        if (!name || !category || !language || !components) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        if (typeof components === 'string') {
            return res.status(400).json({ error: 'Invalid JSON format for components' });
        }

        const result = await templateModel.create({
            user_id,
            name,
            category,
            language,
            components,
            parameters: parameters || null
        });

        // Construct the templateData object
        const templateData = {
            name,
            category,
            "parameter_format": "NAMED",
            language,
            components
        };

        // await whatsappService.createTemplate(businessAccountId, accessToken, templateData);

        return res.status(201).json({ message: 'Template created successfully' });
    } catch (err) {
        console.error('Error creating template:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get the invoice template
export const getInvoiceTemplate = async (req, res, next) => {
    try {
        const user_id = req.user.id;
        const name = "invoice";
        const result = await templateModel.getTemplateById(id, user_id);
        res.status(200).json(result);
    } catch (err) {
        console.error('Error fetching template:', err);
        if (err.message === 'Template not found') {
            return res.status(404).json({ message: err.message });
        }
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Create a new template
export const createTemplate = async (req, res, next) => {
    try {
        const user_id = req.user.id;  // user_id is set by auth middleware
        
        // Fetch user's WhatsApp credentials
        const credential = await credentialModel.getCredentialsById(user_id);
        if (!credential) {
            return res.status(400).json({ error: 'WhatsApp credentials not found. Please add your credentials first.' });
        }
        
        const businessAccountId = credential.whatsappBusinessId;
        const accessToken = credential.whatsappAccessToken;

        const {
            name,
            category,
            language,
            components,
            parameters
        } = req.body;

        if (!name || !category || !language || !components) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        if (typeof components === 'string') {
            return res.status(400).json({ error: 'Invalid JSON format for components' });
        }

        const result = await templateModel.create({
            user_id,
            name,
            category,
            language,
            components,
            parameters: parameters || null
        });

        // Construct the templateData object
        const templateData = {
            name,
            category,
            "parameter_format": "NAMED",
            language,
            components
        };

        await whatsappService.createTemplate(businessAccountId, accessToken, templateData);

        return res.status(201).json({ message: 'Template created successfully' });
    } catch (err) {
        console.error('Error creating template:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get all templates for the logged-in user
export const getAllTemplates = async (req, res, next) => {
    try {
        const user_id = req.user.id;
        const result = await templateModel.getAllTemplates(user_id);
        res.status(200).json(result);
    } catch (err) {
        console.error('Error fetching templates:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get a specific template by ID (must belong to the user)
export const getTemplateById = async (req, res, next) => {
    try {
        const user_id = req.user.id;
        const id = req.params.id;
        const result = await templateModel.getTemplateById(id, user_id);
        res.status(200).json(result);
    } catch (err) {
        console.error('Error fetching template:', err);
        if (err.message === 'Template not found') {
            return res.status(404).json({ message: err.message });
        }
        res.status(500).json({ error: 'Internal Server Error' });
    }
};