import credentialModel from '../models/credentialModel.js';

// TODO: Integrate adding phoe numbers with whatsappService

// To create a new Credential entry
export const addCredential = async (req, res) => {
    try {
        const userId = req.user.id; // 🔐 Secure from auth middleware

        const {
            whatsappAccessToken,
            whatsappBusinessId,
            businessName
        } = req.body;

        const requiredFields = ["whatsappAccessToken", "whatsappBusinessId", "businessName"];
        const missingFields = requiredFields.filter(field => !req.body[field]);

        if (!userId) {
            missingFields.push("userId (from auth)");
        }

        if (missingFields.length > 0) {
            return res.status(400).json({
                error: `Missing required fields: ${missingFields.join(', ')}`
            });
        }

        const result = await credentialModel.create({
            userId,
            whatsappAccessToken,
            whatsappBusinessId,
            businessName
        });

        return res.status(201).json({
            message: 'Credential created successfully',
            credentialId: result.insertId
        });

    } catch (err) {
        console.error('Error creating Credential:', err);

        if (err.code === 'ER_NO_REFERENCED_ROW_2') {
            return res.status(400).json({
                error: 'Invalid user_id: User does not exist'
            });
        }

        return res.status(500).json({
            error: 'Internal Server Error',
            details: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
    }
};


// To get all Credentials
export const getAllCredentials = async (req, res) => {
    try {
        const Credentials = await credentialModel.getAllCredentials();
        res.status(200).json(Credentials);
    } catch (err) {
        console.error('Controller error:', err);
        res.status(500).json({
            error: 'Failed to fetch Credentials',
            details: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
    }
};

// To get credential of a single user by id
export const getCredential = async (req, res) => {
    console.log('Inside getCredential controller');


    try {
        const userId = req.user.id;
        console.log('userId:', userId);
        const credential = await credentialModel.getCredentialsById(userId);
        res.status(200).json(credential);
    } catch (err) {
        if (err.message === 'user not found') {
            return res.status(404).json({ error: err.message });
        }
        res.status(500).json({
            error: 'Failed to fetch credential',
            details: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
    }
};

// To add a phone numberr to a user id
export const addPhoneNumber = async (req, res) => {
    try {
        const userId = req.user.credentialid;

        const { phoneNumber } = req.body;

        if (!userId || !phoneNumber) {
            return res.status(400).json({ message: "userId and phoneNumber are required" });
        }

        await credentialModel.addPhoneNumber({ userId, phoneNumber });

        res.status(201).json({
            message: "Phone number added successfully for the user."
        });
    } catch (err) {
        console.error("Error adding phone number to user:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getPhoneNumber = async (req, res) => {
    console.log('Inside getPhoneNumber controller');
    try {
        const userId = req.user.id;
        console.log('userId:', userId);



        if (!userId) {
            return res.status(400).json({ message: "user ID is required" });
        }

        const phoneNumbers = await credentialModel.getPhoneNumber(userId);
        const numbers = phoneNumbers.map(item => item.phone_number);

        res.status(200).json({
            phoneNumbers: numbers
        });

    } catch (err) {
        console.error("Error fetching phone numbers for user:", err);

        if (err.message === 'user not found') {
            return res.status(404).json({ message: err.message });
        }

        res.status(500).json({ error: "Internal Server Error" });
    }
};

