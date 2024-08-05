import React, { useState } from 'react';
import axios from 'axios';

const DynamicForm = () => {
  const [formData, setFormData] = useState({
    calculatorId: '',
    type: '',
    name: '',
    propertyValueStart: '',
    propertyValueEnd: '',
    legalFees: '',
    percentageOfValue: false,
    plusFixedFee: false,
    pricedOnApplication: false,
    supplementName: '',
    supplementCost: '',
    supplementFree: false,
    supplementJoinQuotes: false,
    supplementPerIndividual: false,
    supplementVariable: false,
    supplementPricedOnApplication: false,
    disbursementName: '',
    disbursementCost: '',
    disbursementFree: false,
    disbursementJoinQuotes: false,
    disbursementPerIndividual: false,
    disbursementVariable: false,
    disbursementPricedOnApplication: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const quoteTypeResponse = await axios.post('/api/quoteTypes', {
        calculatorId: Number(formData.calculatorId),
        type: formData.type,
        name: formData.name,
      });

      const quoteTypeId = quoteTypeResponse.data.id;

      await axios.post('/api/values', {
        quoteTypeId,
        propertyValueStart: Number(formData.propertyValueStart),
        propertyValueEnd: Number(formData.propertyValueEnd),
        legalFees: Number(formData.legalFees),
        percentageOfValue: formData.percentageOfValue,
        plusFixedFee: formData.plusFixedFee,
        pricedOnApplication: formData.pricedOnApplication,
      });

      await axios.post('/api/supplements', {
        quoteTypeId,
        name: formData.supplementName,
        cost: Number(formData.supplementCost),
        free: formData.supplementFree,
        joinQuotes: formData.supplementJoinQuotes,
        perIndividual: formData.supplementPerIndividual,
        variable: formData.supplementVariable,
        pricedOnApplication: formData.supplementPricedOnApplication,
      });

      await axios.post('/api/disbursements', {
        quoteTypeId,
        name: formData.disbursementName,
        cost: Number(formData.disbursementCost),
        free: formData.disbursementFree,
        joinQuotes: formData.disbursementJoinQuotes,
        perIndividual: formData.disbursementPerIndividual,
        variable: formData.disbursementVariable,
        pricedOnApplication: formData.disbursementPricedOnApplication,
      });

      alert('Data saved successfully');
      setFormData({
        calculatorId: '',
        type: '',
        name: '',
        propertyValueStart: '',
        propertyValueEnd: '',
        legalFees: '',
        percentageOfValue: false,
        plusFixedFee: false,
        pricedOnApplication: false,
        supplementName: '',
        supplementCost: '',
        supplementFree: false,
        supplementJoinQuotes: false,
        supplementPerIndividual: false,
        supplementVariable: false,
        supplementPricedOnApplication: false,
        disbursementName: '',
        disbursementCost: '',
        disbursementFree: false,
        disbursementJoinQuotes: false,
        disbursementPerIndividual: false,
        disbursementVariable: false,
        disbursementPricedOnApplication: false,
      });
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Failed to save data');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Calculator ID</label>
        <input type="text" name="calculatorId" value={formData.calculatorId} onChange={handleChange} />
      </div>
      <div>
        <label>Type</label>
        <input type="text" name="type" value={formData.type} onChange={handleChange} />
      </div>
      <div>
        <label>Name</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
      </div>
      <div>
        <label>Property Value Start</label>
        <input type="text" name="propertyValueStart" value={formData.propertyValueStart} onChange={handleChange} />
      </div>
      <div>
        <label>Property Value End</label>
        <input type="text" name="propertyValueEnd" value={formData.propertyValueEnd} onChange={handleChange} />
      </div>
      <div>
        <label>Legal Fees</label>
        <input type="text" name="legalFees" value={formData.legalFees} onChange={handleChange} />
      </div>
      <div>
        <label>Percentage of Value</label>
        <input type="checkbox" name="percentageOfValue" checked={formData.percentageOfValue} onChange={handleChange} />
      </div>
      <div>
        <label>Plus Fixed Fee</label>
        <input type="checkbox" name="plusFixedFee" checked={formData.plusFixedFee} onChange={handleChange} />
      </div>
      <div>
        <label>Priced on Application</label>
        <input type="checkbox" name="pricedOnApplication" checked={formData.pricedOnApplication} onChange={handleChange} />
      </div>
      <div>
        <label>Supplement Name</label>
        <input type="text" name="supplementName" value={formData.supplementName} onChange={handleChange} />
      </div>
      <div>
        <label>Supplement Cost</label>
        <input type="text" name="supplementCost" value={formData.supplementCost} onChange={handleChange} />
      </div>
      <div>
        <label>Supplement Free</label>
        <input type="checkbox" name="supplementFree" checked={formData.supplementFree} onChange={handleChange} />
      </div>
      <div>
        <label>Supplement Join Quotes</label>
        <input type="checkbox" name="supplementJoinQuotes" checked={formData.supplementJoinQuotes} onChange={handleChange} />
      </div>
      <div>
        <label>Supplement Per Individual</label>
        <input type="checkbox" name="supplementPerIndividual" checked={formData.supplementPerIndividual} onChange={handleChange} />
      </div>
      <div>
        <label>Supplement Variable</label>
        <input type="checkbox" name="supplementVariable" checked={formData.supplementVariable} onChange={handleChange} />
      </div>
      <div>
        <label>Supplement Priced on Application</label>
        <input type="checkbox" name="supplementPricedOnApplication" checked={formData.supplementPricedOnApplication} onChange={handleChange} />
      </div>
      <div>
        <label>Disbursement Name</label>
        <input type="text" name="disbursementName" value={formData.disbursementName} onChange={handleChange} />
      </div>
      <div>
        <label>Disbursement Cost</label>
        <input type="text" name="disbursementCost" value={formData.disbursementCost} onChange={handleChange} />
      </div>
      <div>
        <label>Disbursement Free</label>
        <input type="checkbox" name="disbursementFree" checked={formData.disbursementFree} onChange={handleChange} />
      </div>
      <div>
        <label>Disbursement Join Quotes</label>
        <input type="checkbox" name="disbursementJoinQuotes" checked={formData.disbursementJoinQuotes} onChange={handleChange} />
      </div>
      <div>
        <label>Disbursement Per Individual</label>
        <input type="checkbox" name="disbursementPerIndividual" checked={formData.disbursementPerIndividual} onChange={handleChange} />
      </div>
      <div>
        <label>Disbursement Variable</label>
        <input type="checkbox" name="disbursementVariable" checked={formData.disbursementVariable} onChange={handleChange} />
      </div>
      <div>
        <label>Disbursement Priced on Application</label>
        <input type="checkbox" name="disbursementPricedOnApplication" checked={formData.disbursementPricedOnApplication} onChange={handleChange} />
      </div>
      <button type="submit">Save Data</button>
    </form>
  );
};

export default DynamicForm;
