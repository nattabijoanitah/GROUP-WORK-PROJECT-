import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../../api/api';


export default function AdminGiving() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const [searchEmail, setSearchEmail] = useState('');
  const [updatingId, setUpdatingId] = useState(null);

  const getToken = () => {
    return localStorage.getItem('access_token');
  };

  const loadGiving = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await fetch(
        `${API_BASE_URL}/api/admin/giving`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

      const text = await response.text();

      let data = {};

      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        throw new Error(
          'The server returned an invalid response.'
        );
      }

      if (!response.ok) {
        throw new Error(
          data.message ||
            data.error ||
            `Failed to load giving records (${response.status})`
        );
      }

      setRecords(
        Array.isArray(data)
          ? data
          : data.items || []
      );
    } catch (err) {
      console.error('GIVING ERROR:', err);

      setError(
        err.message ||
          'Failed to load giving records.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGiving();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchEmail.trim()) {
      await loadGiving();
      return;
    }

    try {
      setLoading(true);
      setError('');

      const response = await fetch(
        `${API_BASE_URL}/api/admin/giving/search?email=${encodeURIComponent(
          searchEmail.trim()
        )}`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            data.error ||
            'Failed to search giving records.'
        );
      }

      setRecords(data.items || []);
    } catch (err) {
      console.error('GIVING SEARCH ERROR:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const markAsPaid = async (id) => {
    try {
      setUpdatingId(id);
      setError('');

      const response = await fetch(
        `${API_BASE_URL}/api/admin/giving/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getToken()}`,
          },
          body: JSON.stringify({ status: 'paid' }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            data.error ||
            'Failed to update giving record.'
        );
      }

      await loadGiving();
    } catch (err) {
      console.error('GIVING UPDATE ERROR:', err);
      setError(err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatus = (record) => {
    return String(
      record.status || 'pending'
    ).toLowerCase();
  };

  const filteredRecords =
    filter === 'all'
      ? records
      : records.filter(
          (record) => getStatus(record) === filter
        );

  const paidCount = records.filter(
    (record) => getStatus(record) === 'paid'
  ).length;

  const pendingCount = records.filter(
    (record) => getStatus(record) === 'pending'
  ).length;

  const totalPaidAmount = records
    .filter((record) => getStatus(record) === 'paid')
    .reduce((sum, record) => sum + Number(record.amount || 0), 0);

  return (
    <div
      style={{
        maxWidth: '1400px',
        margin: '0 auto',
      }}
    >
      {/* HEADER */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: '20px',
          marginBottom: '28px',
          flexWrap: 'wrap',
        }}
      >
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '8px',
            }}
          >
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '11px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background:
                  'linear-gradient(135deg, #d4af37, #9d781b)',
                color: '#071124',
                fontSize: '18px',
                fontWeight: '900',
                boxShadow:
                  '0 8px 20px rgba(212,175,55,0.14)',
              }}
            >
              ♦
            </div>

            <div>
              <p
                style={{
                  margin: 0,
                  color: '#d4af37',
                  fontSize: '10px',
                  fontWeight: '700',
                  letterSpacing: '1.3px',
                  textTransform: 'uppercase',
                }}
              >
                IHEMA Administration
              </p>

              <h1
                style={{
                  margin: '4px 0 0',
                  color: '#ffffff',
                  fontSize: '28px',
                  fontWeight: '800',
                  letterSpacing: '-0.5px',
                }}
              >
                Giving
              </h1>
            </div>
          </div>

          <p
            style={{
              margin: 0,
              color: 'rgba(255,255,255,0.52)',
              fontSize: '13px',
            }}
          >
            View and manage tithes, offerings and
            gifts submitted through the website.
          </p>
        </div>

        {/* ONLINE */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '9px',
            padding: '9px 13px',
            borderRadius: '10px',
            background:
              'rgba(74,222,128,0.07)',
            border:
              '1px solid rgba(74,222,128,0.12)',
          }}
        >
          <span
            style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              background: '#4ade80',
              boxShadow:
                '0 0 8px rgba(74,222,128,0.7)',
            }}
          />

          <span
            style={{
              color:
                'rgba(255,255,255,0.65)',
              fontSize: '11px',
              fontWeight: '600',
            }}
          >
            Online
          </span>
        </div>
      </div>

      {/* ERROR */}
      {error && (
        <div
          style={{
            marginBottom: '20px',
            padding: '13px 16px',
            borderRadius: '11px',
            background:
              'rgba(239,68,68,0.08)',
            border:
              '1px solid rgba(239,68,68,0.18)',
            color: '#fca5a5',
            fontSize: '12px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '15px',
          }}
        >
          <span>{error}</span>

          <button
            onClick={loadGiving}
            style={{
              border: 'none',
              background: 'transparent',
              color: '#d4af37',
              cursor: 'pointer',
              fontWeight: '700',
              fontSize: '11px',
            }}
          >
            Try Again
          </button>
        </div>
      )}

      {/* STAT CARDS */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns:
            'repeat(auto-fit, minmax(190px, 1fr))',
          gap: '15px',
          marginBottom: '24px',
        }}
      >
        <StatCard
          label="Total Records"
          value={records.length}
          icon="♦"
        />

        <StatCard
          label="Paid"
          value={paidCount}
          icon="✓"
        />

        <StatCard
          label="Pending"
          value={pendingCount}
          icon="◷"
        />

        <StatCard
          label="Total Paid (UGX)"
          value={totalPaidAmount.toLocaleString()}
          icon="♦"
        />
      </div>

      {/* SEARCH */}
      <form
        onSubmit={handleSearch}
        style={{
          display: 'flex',
          gap: '10px',
          marginBottom: '20px',
        }}
      >
        <input
          type="email"
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
          placeholder="Search by donor email..."
          style={{
            flex: 1,
            padding: '11px 14px',
            borderRadius: '9px',
            border:
              '1px solid rgba(255,255,255,0.09)',
            background: '#0a1527',
            color: '#ffffff',
            outline: 'none',
            fontSize: '12px',
          }}
        />

        <button
          type="submit"
          style={{
            padding: '11px 18px',
            borderRadius: '9px',
            border: 'none',
            background:
              'linear-gradient(135deg, #d4af37, #b58c25)',
            color: '#071124',
            fontWeight: '700',
            cursor: 'pointer',
            fontSize: '12px',
          }}
        >
          Search
        </button>
      </form>

      {/* GIVING SECTION */}
      <section
        style={{
          background:
            'linear-gradient(145deg, rgba(255,255,255,0.045), rgba(255,255,255,0.02))',
          border:
            '1px solid rgba(255,255,255,0.07)',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow:
            '0 15px 40px rgba(0,0,0,0.12)',
        }}
      >
        {/* SECTION HEADER */}
        <div
          style={{
            padding: '22px 24px',
            borderBottom:
              '1px solid rgba(255,255,255,0.07)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '15px',
            flexWrap: 'wrap',
          }}
        >
          <div>
            <h2
              style={{
                margin: 0,
                color: '#ffffff',
                fontSize: '16px',
                fontWeight: '750',
              }}
            >
              Giving Records
            </h2>

            <p
              style={{
                margin: '5px 0 0',
                color:
                  'rgba(255,255,255,0.4)',
                fontSize: '11px',
              }}
            >
              Tithes, offerings, missions and
              building fund gifts.
            </p>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            {['all', 'pending', 'paid', 'failed'].map(
              (item) => (
                <button
                  key={item}
                  onClick={() =>
                    setFilter(item)
                  }
                  style={{
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border:
                      filter === item
                        ? '1px solid rgba(212,175,55,0.3)'
                        : '1px solid rgba(255,255,255,0.08)',
                    background:
                      filter === item
                        ? 'rgba(212,175,55,0.12)'
                        : 'rgba(255,255,255,0.035)',
                    color:
                      filter === item
                        ? '#d4af37'
                        : 'rgba(255,255,255,0.55)',
                    cursor: 'pointer',
                    fontSize: '10px',
                    fontWeight: '700',
                    textTransform:
                      'capitalize',
                  }}
                >
                  {item}
                </button>
              )
            )}

            <button
              onClick={loadGiving}
              style={{
                padding: '8px 12px',
                borderRadius: '8px',
                border:
                  '1px solid rgba(255,255,255,0.08)',
                background:
                  'rgba(255,255,255,0.035)',
                color:
                  'rgba(255,255,255,0.65)',
                cursor: 'pointer',
                fontSize: '10px',
                fontWeight: '600',
              }}
            >
              ↻ Refresh
            </button>
          </div>
        </div>

        {/* CONTENT */}
        {loading ? (
          <div
            style={{
              padding: '60px 20px',
              textAlign: 'center',
              color:
                'rgba(255,255,255,0.42)',
              fontSize: '12px',
            }}
          >
            Loading giving records...
          </div>
        ) : filteredRecords.length === 0 ? (
          <div
            style={{
              padding: '70px 20px',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                width: '58px',
                height: '58px',
                margin:
                  '0 auto 16px',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background:
                  'rgba(212,175,55,0.07)',
                border:
                  '1px solid rgba(212,175,55,0.12)',
                color: '#d4af37',
                fontSize: '24px',
              }}
            >
              ♦
            </div>

            <h3
              style={{
                margin: 0,
                color: '#ffffff',
                fontSize: '14px',
                fontWeight: '700',
              }}
            >
              No giving records
            </h3>

            <p
              style={{
                margin: '7px 0 0',
                color:
                  'rgba(255,255,255,0.4)',
                fontSize: '11px',
              }}
            >
              There are currently no giving
              records to display.
            </p>
          </div>
        ) : (
          <div
            style={{
              overflowX: 'auto',
            }}
          >
            <table
              style={{
                width: '100%',
                borderCollapse:
                  'collapse',
                minWidth: '900px',
              }}
            >
              <thead>
                <tr>
                  {[
                    'Donor',
                    'Email',
                    'Amount',
                    'Purpose',
                    'Method',
                    'Status',
                    'Date',
                    'Actions',
                  ].map((heading) => (
                    <th
                      key={heading}
                      style={{
                        padding:
                          '13px 20px',
                        textAlign:
                          'left',
                        color:
                          'rgba(255,255,255,0.35)',
                        fontSize:
                          '10px',
                        fontWeight:
                          '700',
                        letterSpacing:
                          '0.8px',
                        textTransform:
                          'uppercase',
                        borderBottom:
                          '1px solid rgba(255,255,255,0.06)',
                      }}
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {filteredRecords.map(
                  (record, index) => {
                    const status =
                      getStatus(record);

                    return (
                      <tr
                        key={
                          record.id ||
                          index
                        }
                      >
                        <td
                          style={
                            tableCell
                          }
                        >
                          {record.donor_name ||
                            'Anonymous'}
                        </td>

                        <td
                          style={{
                            ...tableCell,
                            color:
                              'rgba(255,255,255,0.5)',
                            fontWeight:
                              '400',
                          }}
                        >
                          {record.email ||
                            '—'}
                        </td>

                        <td
                          style={
                            tableCell
                          }
                        >
                          {record.currency ||
                            'UGX'}{' '}
                          {Number(
                            record.amount || 0
                          ).toLocaleString()}
                        </td>

                        <td
                          style={{
                            ...tableCell,
                            color:
                              'rgba(255,255,255,0.5)',
                            fontWeight:
                              '400',
                          }}
                        >
                          {record.purpose ||
                            '—'}
                        </td>

                        <td
                          style={{
                            ...tableCell,
                            color:
                              'rgba(255,255,255,0.5)',
                            fontWeight:
                              '400',
                          }}
                        >
                          {record.payment_method ||
                            '—'}
                        </td>

                        <td
                          style={
                            tableCell
                          }
                        >
                          <span
                            style={{
                              display:
                                'inline-flex',
                              padding:
                                '5px 9px',
                              borderRadius:
                                '7px',
                              background:
                                status ===
                                'paid'
                                  ? 'rgba(74,222,128,0.08)'
                                  : status ===
                                    'failed'
                                  ? 'rgba(239,68,68,0.08)'
                                  : 'rgba(251,191,36,0.08)',
                              border:
                                status ===
                                'paid'
                                  ? '1px solid rgba(74,222,128,0.14)'
                                  : status ===
                                    'failed'
                                  ? '1px solid rgba(239,68,68,0.14)'
                                  : '1px solid rgba(251,191,36,0.14)',
                              color:
                                status ===
                                'paid'
                                  ? '#4ade80'
                                  : status ===
                                    'failed'
                                  ? '#fca5a5'
                                  : '#fbbf24',
                              fontSize:
                                '10px',
                              fontWeight:
                                '700',
                              textTransform:
                                'capitalize',
                            }}
                          >
                            {status}
                          </span>
                        </td>

                        <td
                          style={{
                            ...tableCell,
                            color:
                              'rgba(255,255,255,0.45)',
                            fontWeight:
                              '400',
                          }}
                        >
                          {record.created_at
                            ? new Date(
                                record.created_at
                              ).toLocaleDateString()
                            : '—'}
                        </td>

                        <td
                          style={
                            tableCell
                          }
                        >
                          {status !==
                          'paid' ? (
                            <button
                              onClick={() =>
                                markAsPaid(
                                  record.id
                                )
                              }
                              disabled={
                                updatingId ===
                                record.id
                              }
                              style={{
                                padding:
                                  '7px 11px',
                                borderRadius:
                                  '7px',
                                border:
                                  '1px solid rgba(212,175,55,0.2)',
                                background:
                                  'rgba(212,175,55,0.07)',
                                color:
                                  '#d4af37',
                                cursor:
                                  updatingId ===
                                  record.id
                                    ? 'not-allowed'
                                    : 'pointer',
                                fontSize:
                                  '11px',
                                fontWeight:
                                  '700',
                                opacity:
                                  updatingId ===
                                  record.id
                                    ? 0.6
                                    : 1,
                              }}
                            >
                              {updatingId ===
                              record.id
                                ? 'Updating...'
                                : 'Mark Paid'}
                            </button>
                          ) : (
                            '—'
                          )}
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon,
}) {
  return (
    <div
      style={{
        padding: '18px',
        borderRadius: '14px',
        background:
          'linear-gradient(145deg, rgba(255,255,255,0.045), rgba(255,255,255,0.018))',
        border:
          '1px solid rgba(255,255,255,0.065)',
        boxShadow:
          '0 10px 30px rgba(0,0,0,0.1)',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent:
            'space-between',
          alignItems: 'center',
          marginBottom: '14px',
        }}
      >
        <span
          style={{
            color:
              'rgba(255,255,255,0.43)',
            fontSize: '10px',
            fontWeight: '700',
            letterSpacing:
              '0.7px',
            textTransform:
              'uppercase',
          }}
        >
          {label}
        </span>

        <span
          style={{
            color: '#d4af37',
            fontSize: '16px',
          }}
        >
          {icon}
        </span>
      </div>

      <strong
        style={{
          color: '#ffffff',
          fontSize: '25px',
          fontWeight: '800',
        }}
      >
        {value}
      </strong>
    </div>
  );
}

const tableCell = {
  padding: '17px 20px',
  color: '#ffffff',
  fontSize: '12px',
  fontWeight: '650',
  borderBottom:
    '1px solid rgba(255,255,255,0.045)',
};