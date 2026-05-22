import { useState, useEffect } from 'react';
import axiosInstance from '../services/axiosInstance';

export const useUserDetails = () => {
  const [userDetails, setUserDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    avatar: '',
    mobile: '',
    companyName: '',
    website: '',
    wabaId: '',
    phoneId: '',
    businessId: '',
    wabaToken: '',
    phoneNumbers: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAll = async () => {
    try {
      const [userRes, credRes, phoneRes] = await Promise.all([
        axiosInstance.get('/user/user-details'),
        axiosInstance.get('/credential/get'),
        axiosInstance.get('/credential/phone'),
      ]);

      const user = userRes.data?.data || {};
      const credential = credRes.data?.data || {};
      const phones = Array.isArray(phoneRes.data) ? phoneRes.data : [];

      const fullName = user?.name || '';
      const parts = fullName.split(' ');
      const firstName = parts[0] || '';
      const lastName = parts.slice(1).join(' ') || '';

      setUserDetails({
        firstName,
        lastName,
        email: user.email || '',
        avatar: user.avatar || '',
        mobile: user.mobile || '',
        companyName: credential.business_name || '',
        website: credential.website || '',
        wabaId: credential.waba_id || '',
        phoneId: credential.phone_id || '',
        businessId: credential.whatsapp_business_id || '',
        wabaToken: credential.whatsapp_access_token || '',
        phoneNumbers: phones.map((p) => p.phone_number),
      });

      setError(null);
    } catch (err) {
      console.error('Error in useUserDetails:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return { userDetails, setUserDetails, loading, error };
};
