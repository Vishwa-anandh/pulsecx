import React from 'react';
import { useSetup } from '../SetupContext';
import { Globe, DollarSign, Database, Cloud, ShoppingCart } from 'lucide-react';

export default function Step2MonitorType() {
  const { setupData, updateData, nextStep, prevStep } = useSetup();

  const options = [
    {
      id: 'website',
      title: 'Website Monitoring',
      icon: <Globe size={20} className="text-primary" />,
      items: ['Homepage', 'Login', 'Search', 'Forms', 'Customer Portal']
    },
    {
      id: 'finance',
      title: 'Banking & FinServ',
      icon: <DollarSign size={20} className="text-primary" />,
      items: ['Login', 'Transactions', 'Customer Dashboard', 'SAP Fiori']
    },
    {
      id: 'erp',
      title: 'Enterprise ERP',
      icon: <Database size={20} className="text-primary" />,
      items: ['Launchpad', 'Workflows', 'Transactions', 'SAP BTP']
    },
    {
      id: 'cloud',
      title: 'Cloud Infrastructure',
      icon: <Cloud size={20} className="text-primary" />,
      items: ['Applications', 'APIs', 'E-Commerce']
    },
    {
      id: 'retail',
      title: 'Retail / E-commerce',
      icon: <ShoppingCart size={20} className="text-primary" />,
      items: ['Product Search', 'Cart', 'Checkout', 'Payment']
    }
  ];

  return (
    <div className="animate-fade-in" style={{ padding: '3rem', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%', flex: 1, display: 'flex', flexDirection: 'column' }}>
        
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Choose what you want to monitor</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Select the category that best matches your application type.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', overflowY: 'auto', paddingBottom: '1rem' }}>
          {options.map(opt => {
            const isSelected = setupData.monitoringType === opt.id;
            return (
              <div 
                key={opt.id}
                onClick={() => updateData({ monitoringType: opt.id })}
                style={{ 
                  padding: '1.5rem', 
                  background: isSelected ? 'var(--accent-primary-glow)' : 'var(--bg-base)', 
                  border: '1px solid',
                  borderColor: isSelected ? 'var(--accent-primary)' : 'var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <div style={{ padding: '0.5rem', background: 'var(--bg-surface)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                    {opt.icon}
                  </div>
                  <h3 style={{ fontWeight: '600', fontSize: '1.125rem' }}>{opt.title}</h3>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {opt.items.map(item => (
                    <span key={item} style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '12px', color: 'var(--text-secondary)' }}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', paddingTop: '2rem' }}>
          <button className="btn btn-ghost" onClick={prevStep}>Back</button>
          <button 
            className="btn btn-primary" 
            onClick={nextStep}
            disabled={!setupData.monitoringType}
            style={{ opacity: !setupData.monitoringType ? 0.5 : 1 }}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
