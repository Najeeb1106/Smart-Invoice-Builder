import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { useInvoice } from '../../state/InvoiceContext';
import { formatCurrency } from '../../utils/formatters';

export const SectionItems: React.FC = () => {
  const { invoice, addItem, updateItem, removeItem } = useInvoice();
  const currency = invoice.details.currency;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '2px' }}>Line Items</h3>
          <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
            Add products or services provided to your client.
          </p>
        </div>
        <Button
          variant="secondary"
          size="sm"
          leftIcon={<Plus size={14} />}
          onClick={addItem}
        >
          Add Item
        </Button>
      </div>

      {/* Desktop Table View */}
      <div className="desktop-items-table" style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--color-border)', fontSize: '11px', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              <th style={{ textAlign: 'left', padding: '6px 6px' }}>Item Description</th>
              <th style={{ textAlign: 'center', padding: '6px 6px', width: '80px' }}>Qty</th>
              <th style={{ textAlign: 'center', padding: '6px 6px', width: '110px' }}>Price</th>
              <th style={{ textAlign: 'right', padding: '6px 6px', width: '100px' }}>Total</th>
              <th style={{ width: '36px' }}></th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((item) => {
              const itemTotal = item.quantity * item.price;
              return (
                <tr key={item.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '4px 3px' }}>
                    <Input
                      placeholder="Item name or service description"
                      value={item.description}
                      onChange={(e) => updateItem(item.id, { description: e.target.value })}
                    />
                  </td>
                  <td style={{ padding: '4px 3px' }}>
                    <Input
                      type="number"
                      min="0"
                      step="any"
                      value={item.quantity}
                      onChange={(e) => updateItem(item.id, { quantity: parseFloat(e.target.value) || 0 })}
                      style={{ textAlign: 'center' }}
                    />
                  </td>
                  <td style={{ padding: '4px 3px' }}>
                    <Input
                      type="number"
                      min="0"
                      step="any"
                      value={item.price}
                      onChange={(e) => updateItem(item.id, { price: parseFloat(e.target.value) || 0 })}
                      style={{ textAlign: 'right' }}
                    />
                  </td>
                  <td style={{ padding: '4px 6px', textAlign: 'right', fontWeight: 600, fontSize: '13px', color: 'var(--color-text-primary)' }}>
                    {formatCurrency(itemTotal, currency)}
                  </td>
                  <td style={{ padding: '4px 2px', textAlign: 'center' }}>
                    <button
                      onClick={() => removeItem(item.id)}
                      disabled={invoice.items.length <= 1}
                      style={{
                        color: invoice.items.length <= 1 ? 'var(--color-border-strong)' : 'var(--color-danger)',
                        cursor: invoice.items.length <= 1 ? 'not-allowed' : 'pointer',
                        padding: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 'var(--radius-sm)',
                      }}
                      aria-label="Delete item"
                      title={invoice.items.length <= 1 ? 'At least one item is required' : 'Delete item'}
                    >
                      <Trash2 size={15} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Stacked Card View */}
      <div className="mobile-items-list" style={{ display: 'none', flexDirection: 'column', gap: '12px' }}>
        {invoice.items.map((item, idx) => (
          <div
            key={item.id}
            style={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              padding: '12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-primary)' }}>Line Item #{idx + 1}</span>
              <button
                onClick={() => removeItem(item.id)}
                disabled={invoice.items.length <= 1}
                style={{ color: invoice.items.length <= 1 ? 'var(--color-border-strong)' : 'var(--color-danger)' }}
              >
                <Trash2 size={15} />
              </button>
            </div>
            <Input
              label="Description"
              placeholder="Service description"
              value={item.description}
              onChange={(e) => updateItem(item.id, { description: e.target.value })}
            />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <Input
                label="Quantity"
                type="number"
                min="0"
                value={item.quantity}
                onChange={(e) => updateItem(item.id, { quantity: parseFloat(e.target.value) || 0 })}
              />
              <Input
                label="Unit Price"
                type="number"
                min="0"
                value={item.price}
                onChange={(e) => updateItem(item.id, { price: parseFloat(e.target.value) || 0 })}
              />
            </div>
            <div style={{ textAlign: 'right', fontWeight: 700, fontSize: '13px', paddingTop: '4px', borderTop: '1px solid var(--color-border)' }}>
              Subtotal: {formatCurrency(item.quantity * item.price, currency)}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 640px) {
          .desktop-items-table { display: none !important; }
          .mobile-items-list { display: flex !important; }
        }
      `}</style>
    </div>
  );
};
