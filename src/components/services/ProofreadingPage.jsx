import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuraHeader from '../AuraHeader';
import { useResume } from '../../context/ResumeContext';
import { useAuth } from '../../context/AuthContext';
import {
  Award, ShieldCheck, CheckCircle2, Clock, Users,
  Star, ArrowRight, FileText, Send, Sparkles
} from 'lucide-react';

export default function ProofreadingPage() {
  const navigate = useNavigate();
  const { resumeData } = useResume();
  const { user } = useAuth();

  const [turnaround, setTurnaround] = useState('24h'); // '24h' | '12h'
  const [selectedFocus, setSelectedFocus] = useState('tech'); // 'tech' | 'executive' | 'general'
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'transparent' }}>
      <AuraHeader />

      <main style={{ flex: 1, padding: '2.5rem 1.5rem 5rem', maxWidth: '1280px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        
        {/* HERO ART & ARCHITECTURAL BANNER WITH FLOWER BRACES */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '28px',
          border: '1.5px solid var(--border-color)',
          overflow: 'hidden',
          marginBottom: '2.5rem',
          boxShadow: '0 12px 36px rgba(15, 23, 42, 0.06)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          alignItems: 'center'
        }}>
          {/* Left Hero Details */}
          <div style={{ padding: '2.5rem 2.5rem 2.5rem 3rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.85rem' }}>
              <span style={{
                fontSize: '0.8rem',
                fontWeight: 800,
                color: '#D97706',
                letterSpacing: '0.04em'
              }}>
                {'{ Platform Services / Engine 08 }'}
              </span>
              <span style={{
                fontSize: '0.75rem',
                padding: '2px 10px',
                borderRadius: '9999px',
                background: '#FEF3C7',
                color: '#D97706',
                fontWeight: 800,
                border: '1px solid #FDE68A'
              }}>
                {'{ 24h Turnaround }'}
              </span>
            </div>

            <h1 style={{
              fontSize: '2.6rem',
              fontWeight: 900,
              color: 'var(--text-main)',
              margin: '0 0 0.85rem 0',
              letterSpacing: '-0.035em',
              lineHeight: 1.15
            }}>
              {'{ Certified CPRW Human Proofreading }'}
            </h1>

            <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: '0 0 1.75rem 0' }}>
              Every word, metric, and formatting nuance inspected by certified CPRW / PARWCC recruiters with direct hiring experience at Fortune 500 companies.
            </p>

            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <CheckCircle2 size={16} color="#D97706" />
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>{'{ Line-by-Line Edits }'}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <CheckCircle2 size={16} color="#D97706" />
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>{'{ CPRW Certified }'}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <CheckCircle2 size={16} color="#D97706" />
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>{'{ Executive Feedback }'}</span>
              </div>
            </div>
          </div>

          {/* Right Bespoke Art Image Banner */}
          <div style={{ position: 'relative', height: '280px', width: '100%', overflow: 'hidden' }}>
            <img
              src="/images/services/service_human_proofreading.jpg"
              alt="Human Proofreading Visual"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 25%), linear-gradient(to top, rgba(15,23,42,0.6) 0%, transparent 60%)'
            }} />
            <div style={{ position: 'absolute', bottom: '16px', right: '20px', display: 'flex', gap: '8px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, padding: '4px 10px', borderRadius: '6px', backgroundColor: 'rgba(15,23,42,0.85)', color: '#FFFFFF' }}>
                {'{ Gold Standard Review }'}
              </span>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, padding: '4px 10px', borderRadius: '6px', backgroundColor: 'rgba(15,23,42,0.85)', color: '#FFFFFF' }}>
                {'{ PARWCC Certified }'}
              </span>
            </div>
          </div>
        </div>

        {/* 2-Column Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '2.5rem',
          alignItems: 'start'
        }}>
          
          {/* Left: Request Form (3D Paper Stack) */}
          <div style={{ position: 'relative', width: '100%' }}>
            {/* Sheet 3 */}
            <div style={{ position: 'absolute', inset: 0, borderRadius: '24px', background: '#F1F5F9', border: '1px solid #CBD5E1', transform: 'translate(6px, 7px) rotate(0.8deg)', zIndex: 0 }} />
            {/* Sheet 2 */}
            <div style={{ position: 'absolute', inset: 0, borderRadius: '24px', background: '#FFFBEB', border: '1.5px solid #FDE68A', transform: 'translate(3px, 4px) rotate(0.4deg)', zIndex: 1 }} />

            {/* Sheet 1 */}
            <div style={{ position: 'relative', zIndex: 2, backgroundColor: '#FFFFFF', borderRadius: '24px', border: '1.5px solid #FDE68A', padding: '2rem', boxShadow: 'var(--shadow-md)' }}>
              
              {!isSubmitted ? (
                <form onSubmit={handleSubmitReview}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', margin: '0 0 1.25rem 0' }}>
                    Request Proofreading Review
                  </h3>

                  {/* Active Resume Indicator */}
                  <div style={{
                    padding: '0.85rem 1rem',
                    borderRadius: '12px',
                    backgroundColor: '#FAF9F5',
                    border: '1px solid var(--border-color)',
                    marginBottom: '1.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <FileText size={18} color="#D97706" />
                      <div>
                        <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-main)' }}>
                          {resumeData?.personalInfo?.fullName ? `${resumeData.personalInfo.fullName}'s Resume` : 'Active Resume Draft'}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          {resumeData?.experience?.length || 2} Work Experiences · {resumeData?.skills?.length || 8} Skills
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => navigate('/builder')}
                      style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 700, fontSize: '0.78rem', cursor: 'pointer' }}
                    >
                      Edit →
                    </button>
                  </div>

                  {/* Industry Track Focus */}
                  <div style={{ marginBottom: '1.25rem' }}>
                    <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.45rem' }}>
                      Target Domain Focus
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem' }}>
                      {[
                        { id: 'tech', label: 'Tech & Engineering' },
                        { id: 'executive', label: 'Executive Track' },
                        { id: 'general', label: 'Business & Finance' },
                      ].map((f) => (
                        <button
                          type="button"
                          key={f.id}
                          onClick={() => setSelectedFocus(f.id)}
                          style={{
                            padding: '0.6rem 0.4rem',
                            borderRadius: '10px',
                            border: selectedFocus === f.id ? '2px solid #D97706' : '1px solid var(--border-color)',
                            backgroundColor: selectedFocus === f.id ? '#FFFBEB' : '#FFFFFF',
                            color: selectedFocus === f.id ? '#D97706' : 'var(--text-main)',
                            fontSize: '0.78rem',
                            fontWeight: 700,
                            cursor: 'pointer'
                          }}
                        >
                          {f.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Turnaround Options */}
                  <div style={{ marginBottom: '1.25rem' }}>
                    <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.45rem' }}>
                      Turnaround Speed
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                      <button
                        type="button"
                        onClick={() => setTurnaround('24h')}
                        style={{
                          padding: '0.75rem',
                          borderRadius: '10px',
                          border: turnaround === '24h' ? '2px solid #D97706' : '1px solid var(--border-color)',
                          backgroundColor: turnaround === '24h' ? '#FFFBEB' : '#FFFFFF',
                          color: turnaround === '24h' ? '#D97706' : 'var(--text-main)',
                          fontSize: '0.825rem',
                          fontWeight: 800,
                          cursor: 'pointer'
                        }}
                      >
                        <div>Standard (24 Hours)</div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>Included with Pro</div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setTurnaround('12h')}
                        style={{
                          padding: '0.75rem',
                          borderRadius: '10px',
                          border: turnaround === '12h' ? '2px solid #D97706' : '1px solid var(--border-color)',
                          backgroundColor: turnaround === '12h' ? '#FFFBEB' : '#FFFFFF',
                          color: turnaround === '12h' ? '#D97706' : 'var(--text-main)',
                          fontSize: '0.825rem',
                          fontWeight: 800,
                          cursor: 'pointer'
                        }}
                      >
                        <div>Express (12 Hours)</div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>Rush Delivery</div>
                      </button>
                    </div>
                  </div>

                  {/* Notes */}
                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.45rem' }}>
                      Specific Roles or Companies You Are Targeting (Optional)
                    </label>
                    <textarea
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="e.g. Applying for Senior Cloud Architect at Stripe and Google..."
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1.5px solid var(--border-color)', fontSize: '0.85rem', outline: 'none', resize: 'none', boxSizing: 'border-box' }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="aura-btn-primary"
                    style={{ width: '100%', padding: '0.85rem', fontSize: '0.95rem', justifyContent: 'center', backgroundColor: '#D97706' }}
                  >
                    <Send size={16} />
                    <span>Submit to CPRW Review Team</span>
                  </button>
                </form>
              ) : (
                <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: '#ECFDF5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
                    <CheckCircle2 size={28} />
                  </div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)', margin: '0 0 0.5rem 0' }}>
                    Resume Submitted for Review!
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '1.5rem' }}>
                    A CPRW-certified recruiter has been assigned to your draft. You will receive an annotated report and line-by-line rewrite suggestions within {turnaround === '12h' ? '12 hours' : '24 hours'}.
                  </p>
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="aura-btn-primary"
                    style={{ padding: '0.75rem 1.75rem', fontSize: '0.875rem' }}
                  >
                    <span>Back to Dashboard</span>
                  </button>
                </div>
              )}

            </div>
          </div>

          {/* Right: Recruiter Credentials & Proof */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              border: '1.5px solid var(--border-color)',
              padding: '1.75rem',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', overflow: 'hidden', border: '2px solid #D97706' }}>
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80"
                    alt="Lead HR Consultant"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
                    Christy Morgan, CPRW
                  </h4>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    Former Senior Technical Recruiter at Google · PARWCC Certified
                  </div>
                </div>
              </div>

              <p style={{ fontSize: '0.85rem', color: '#334155', lineHeight: 1.6, fontStyle: 'italic', margin: '0 0 1rem 0' }}>
                "Most applicants are eliminated in the first 6 seconds because of ambiguous job titles or unquantified bullet points. We fix both so hiring managers call you immediately."
              </p>

              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '0.2rem 0.55rem', borderRadius: '999px', backgroundColor: '#ECFDF5', color: '#059669' }}>
                  ✓ 100% ATS Guaranteed
                </span>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '0.2rem 0.55rem', borderRadius: '999px', backgroundColor: '#EFF6FF', color: '#2563EB' }}>
                  ✓ Native English Speakers
                </span>
              </div>
            </div>

            {/* Checklist of what's checked */}
            <div style={{
              backgroundColor: '#FAF9F5',
              borderRadius: '20px',
              border: '1.5px solid var(--border-color)',
              padding: '1.5rem'
            }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-main)', margin: '0 0 0.85rem 0' }}>
                What Our CPRW Proofreaders Audit:
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.825rem', color: 'var(--text-main)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <CheckCircle2 size={14} color="#059669" />
                  <span>Grammar, syntax, and active voice enhancement</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <CheckCircle2 size={14} color="#059669" />
                  <span>Google XYZ formula quantification on every bullet</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <CheckCircle2 size={14} color="#059669" />
                  <span>Workday & Greenhouse ATS parser compatibility</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <CheckCircle2 size={14} color="#059669" />
                  <span>Industry keyword density for your exact role</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}
