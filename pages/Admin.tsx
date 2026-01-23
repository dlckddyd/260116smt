import React, { useState, useRef, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { Lock, LogOut, CheckCircle, Clock, Trash2, Plus, X, MessageSquare, HelpCircle, Star, Camera, Layout, RefreshCw, Upload, Loader2, ArrowUp, ArrowDown, WifiOff, Wifi, Edit3, Image as ImageIcon, Type, Settings, Link as LinkIcon, AlertCircle, FileText, Download, Scissors, Wand2, ArrowRight, Palette, Layers, PieChart } from 'lucide-react';
import { ContentBlock, FAQItem } from '../data/content';
import { naverFaqData } from '../data/naverFaqs';
import { Link, useNavigate } from 'react-router-dom'; // Added useNavigate

const Admin: React.FC = () => {
  const { 
    isAdmin, login, logout, 
    inquiries, updateInquiryStatus,
    faqs, addFaq, addMultipleFaqs, updateFaq, deleteFaq,
    categories, addCategory, deleteCategory,
    reviews, addReview, deleteReview,
    serviceImages, updateServiceImage,
    checkServerHealth
  } = useData();

  const navigate = useNavigate(); // Hook for navigation
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'inquiries' | 'faq' | 'reviews' | 'main'>('inquiries');
  const [showFaqModal, setShowFaqModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  
  // Smart Clipper Modal State
  const [showSmartClipper, setShowSmartClipper] = useState(false);
  const [clipperData, setClipperData] = useState<{ question: string; blocks: ContentBlock[] } | null>(null);
  const [replaceColor, setReplaceColor] = useState(true); // Default to replacing colors
  
  const [isUploading, setIsUploading] = useState(false); 
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  
  // Server Status State
  const [isServerConnected, setIsServerConnected] = useState<boolean | null>(null);

  // FAQ Form State
  const [editingFaqId, setEditingFaqId] = useState<string | null>(null);
  const [faqCategoriesSelection, setFaqCategoriesSelection] = useState<string[]>([]);
  const [newFaqQuestion, setNewFaqQuestion] = useState('');
  const [newFaqBlocks, setNewFaqBlocks] = useState<ContentBlock[]>([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [showCategoryManager, setShowCategoryManager] = useState(false);
  
  // Review Form State
  const [newReview, setNewReview] = useState({ name: '', company: '', content: '', rating: 5, type: 'text', imageUrl: '' });

  // Upload State
  const [activeServiceIdForUpload, setActiveServiceIdForUpload] = useState<string | null>(null);
  const [activeBlockIdForUpload, setActiveBlockIdForUpload] = useState<string | null>(null);

  // Refs
  const faqFileInputRef = useRef<HTMLInputElement>(null);
  const reviewFileInputRef = useRef<HTMLInputElement>(null);
  const mainImageInputRef = useRef<HTMLInputElement>(null);
  const clipperInputRef = useRef<HTMLDivElement>(null);

  // Check Server Health on Mount
  useEffect(() => {
    if (isAdmin) {
        const verifyConnection = async () => {
            const isHealthy = await checkServerHealth();
            setIsServerConnected(isHealthy);
        };
        verifyConnection();
        // Check every 10 seconds
        const timer = setInterval(verifyConnection, 10000);
        return () => clearInterval(timer);
    }
  }, [isAdmin, checkServerHealth]);

  // Safety Valve for Uploads
  useEffect(() => {
    let safetyTimer: ReturnType<typeof setTimeout>;
    if (isUploading) {
        safetyTimer = setTimeout(() => {
            if (isUploading) {
                setIsUploading(false);
                alert("작업 시간이 너무 오래 걸려 중단되었습니다.");
            }
        }, 45000); // 45s timeout for large uploads
    }
    return () => clearTimeout(safetyTimer);
  }, [isUploading]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    // Simulate network delay for UX
    await new Promise(resolve => setTimeout(resolve, 500));
    const success = await login(password);
    setIsLoggingIn(false);
    if (!success) alert('비밀번호가 틀렸습니다.');
  };

  const handleFileUpload = async (file: File): Promise<string> => {
    if (!file) return "";
    
    // Check server connection before upload
    if (isServerConnected === false) {
        alert("서버와 연결이 끊겨있어 업로드할 수 없습니다. 페이지를 새로고침하거나 관리자에게 문의하세요.");
        return "";
    }

    setIsUploading(true);

    try {
       const reader = new FileReader();
       return new Promise((resolve, reject) => {
           reader.onload = async () => {
               try {
                   const base64String = reader.result as string;
                   const safeName = file.name.replace(/[^a-zA-Z0-9.]/g, '_');
                   
                   const response = await fetch('/api/admin/upload-image', {
                       method: 'POST',
                       headers: {
                           'Content-Type': 'application/json',
                           'x-admin-password': 'admin1234'
                       },
                       body: JSON.stringify({
                           image: base64String,
                           filename: safeName
                       })
                   });
                   
                   const data = await response.json();
                   if (!response.ok) throw new Error(data.error || "Server upload failed");
                   
                   resolve(data.url);
               } catch (e) {
                   reject(e);
               }
           };
           reader.onerror = (e) => reject(e);
           reader.readAsDataURL(file);
       });
    } catch (error: any) {
      console.error("Upload failed:", error);
      alert(`이미지 업로드 실패: ${error.message}\n(파일 크기는 50MB 이하여야 합니다)`);
      return "";
    } finally {
      setIsUploading(false);
    }
  };

  // --- Main Image Management ---
  const triggerMainImageUpload = (serviceId: string) => {
    setActiveServiceIdForUpload(serviceId);
    setTimeout(() => {
        mainImageInputRef.current?.click();
    }, 50);
  };

  const onMainImageFileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !activeServiceIdForUpload) {
        setActiveServiceIdForUpload(null);
        return;
    }
    if (mainImageInputRef.current) mainImageInputRef.current.value = '';

    const url = await handleFileUpload(file);
    if (url) {
        try {
            setIsUploading(true);
            await updateServiceImage(activeServiceIdForUpload, url);
            alert("이미지가 성공적으로 변경되었습니다.");
        } catch(e) {
            console.error(e);
            alert("이미지는 업로드되었으나 데이터베이스 저장에 실패했습니다.");
        } finally {
            setIsUploading(false);
            setActiveServiceIdForUpload(null);
        }
    } else {
        setActiveServiceIdForUpload(null);
    }
  };

  // --- FAQ Management ---
  const resetFaqForm = () => {
      setEditingFaqId(null);
      setNewFaqQuestion('');
      setNewFaqBlocks([]);
      setFaqCategoriesSelection([]);
      setShowFaqModal(false);
  };

  const openFaqModalForEdit = (faq: FAQItem) => {
      setEditingFaqId(faq.id);
      setNewFaqQuestion(faq.question);
      setNewFaqBlocks(faq.blocks || []);
      setFaqCategoriesSelection(faq.categories || []);
      setShowFaqModal(true);
  };

  const triggerFaqImageUpload = (blockId: string) => {
    setActiveBlockIdForUpload(blockId);
    setTimeout(() => faqFileInputRef.current?.click(), 50);
  };

  const onFaqFileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !activeBlockIdForUpload) return;
    if (faqFileInputRef.current) faqFileInputRef.current.value = '';
    const url = await handleFileUpload(file);
    if (url) {
        setNewFaqBlocks(prev => prev.map(b => b.id === activeBlockIdForUpload ? { ...b, content: url } : b));
    }
    setActiveBlockIdForUpload(null);
  };

  // FAQ Paste Handler (Global for modal)
  const handleFaqPaste = async (e: React.ClipboardEvent) => {
      const items = e.clipboardData.items;
      let blob: File | null = null;
      
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          blob = items[i].getAsFile();
          break;
        }
      }

      if (blob) {
        e.preventDefault();
        setIsUploading(true);
        try {
          const url = await handleFileUpload(blob);
          if (url) {
             setNewFaqBlocks(prev => {
                 // Smart Paste: If the last block is an empty image block, fill it. Otherwise append.
                 const lastBlock = prev[prev.length - 1];
                 if (lastBlock && lastBlock.type === 'image' && !lastBlock.content) {
                     return prev.map(b => b.id === lastBlock.id ? { ...b, content: url } : b);
                 }
                 return [...prev, { id: Date.now().toString(), type: 'image', content: url }];
             });
          }
        } catch (err) {
          console.error(err);
          alert("이미지 붙여넣기 중 오류가 발생했습니다.");
        } finally {
          setIsUploading(false);
        }
      }
  };

  const handleSaveFaq = async () => {
    if (!newFaqQuestion.trim()) return alert("제목을 입력해주세요.");
    if (newFaqBlocks.length === 0) return alert("내용을 입력해주세요.");
    if (faqCategoriesSelection.length === 0) return alert("최소 1개의 카테고리를 선택해주세요.");

    setIsUploading(true); 
    try {
        const faqData = { categories: faqCategoriesSelection, question: newFaqQuestion, blocks: newFaqBlocks };
        
        if (editingFaqId) {
            await updateFaq(editingFaqId, faqData);
            alert("수정되었습니다.");
        } else {
            await addFaq(faqData);
            alert("등록되었습니다.");
        }
        resetFaqForm();
    } catch (e: any) {
        alert(`저장 실패: ${e.message}`);
    } finally {
        setIsUploading(false);
    }
  };

  const handleImportNaverFaqs = async () => {
      if (!confirm(`네이버 스마트플레이스 관련 주요 질문 ${naverFaqData.length}개를 일괄 등록하시겠습니까?\n(기존 데이터는 유지됩니다)`)) return;
      
      setIsUploading(true);
      try {
          // Ensure all categories exist first
          const uniqueCategories = Array.from(new Set(naverFaqData.flatMap(f => f.categories)));
          for (const cat of uniqueCategories) {
              if (!categories.includes(cat)) {
                  await addCategory(cat);
              }
          }
          
          await addMultipleFaqs(naverFaqData);
          alert("성공적으로 등록되었습니다.");
      } catch (e: any) {
          alert(`등록 실패: ${e.message}`);
      } finally {
          setIsUploading(false);
      }
  };

  // --- Smart Clipper Logic (Enhanced for Rich HTML & Nested Accordions) ---
  const handleSmartClipperPaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
      e.preventDefault();
      
      const html = e.clipboardData.getData('text/html');
      const text = e.clipboardData.getData('text/plain');
      
      // Fallback if no HTML (just plain text)
      if (!html) {
          if (!text) return;
          const lines = text.split('\n').filter(l => l.trim());
          if (lines.length === 0) return;
          
          setClipperData({
              question: lines[0],
              blocks: lines.slice(1).map(line => ({ id: Math.random().toString(), type: 'text', content: line }))
          });
          return;
      }

      // HTML Parsing
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const blocks: ContentBlock[] = [];
      let question = "";

      // 1. Detect Question (Title)
      const headers = doc.querySelectorAll('h1, h2, h3, strong, b');
      if (headers.length > 0 && headers[0].textContent?.trim()) {
          question = headers[0].textContent?.trim() || "";
      } else {
          const firstP = doc.querySelector('p, div');
          if (firstP?.textContent?.trim()) {
              question = firstP.textContent.trim().split('\n')[0];
          } else {
              question = text.split('\n')[0] || "제목 없음";
          }
      }

      // 2. Process Content

      // Helper: Color Replacement
      const processStyle = (styleString: string | null): string => {
          if (!styleString || !replaceColor) return styleString || '';
          
          let newStyle = styleString;
          // Regex for Naver Greens
          const greenRegex = /color:\s*(#03c75a|#00c73c|#00C73C|#2db400|rgb\(\s*3,\s*199,\s*90\s*\)|rgb\(\s*0,\s*199,\s*60\s*\))/gi;
          
          // Replace with Brand Accent (Blue - #2563eb)
          if (greenRegex.test(newStyle)) {
              newStyle = newStyle.replace(greenRegex, 'color: #2563eb; font-weight: bold;');
          }
          return newStyle;
      };

      // Helper: Recursive Node Cleaner
      const cleanNode = (node: Node): string | null => {
          if (node.nodeType === Node.TEXT_NODE) {
              return node.textContent;
          }
          if (node.nodeType === Node.ELEMENT_NODE) {
              const el = node as HTMLElement;
              const tagName = el.tagName.toLowerCase();

              // Skip Title match in body
              if (el.textContent?.trim() === question && blocks.length === 0) return null;

              // Image -> Special Marker
              if (tagName === 'img') {
                  const src = (el as HTMLImageElement).src;
                  if (src) return `__IMG__${src}__IMG__`; 
                  return null;
              }

              if (['script', 'style', 'iframe', 'object'].includes(tagName)) return null;

              // Process Attributes
              let attrs = "";
              if (el.getAttribute('href')) attrs += ` href="${el.getAttribute('href')}" target="_blank"`;
              
              // Handle Styles (Color Swap)
              let style = el.getAttribute('style');
              if (style) {
                  style = processStyle(style);
                  if (style) attrs += ` style="${style}"`;
              }

              let childrenHtml = "";
              el.childNodes.forEach(child => {
                  const cleaned = cleanNode(child);
                  if (cleaned) childrenHtml += cleaned;
              });

              // Allow semantic structural tags
              if (['div', 'p', 'br', 'li', 'h1','h2','h3','h4','h5','h6', 'details', 'summary', 'ul', 'ol', 'b', 'strong', 'i', 'u', 'span', 'a'].includes(tagName)) {
                  if (tagName === 'br') return '<br/>';
                  // Strip Naver specific classes for cleaner HTML
                  return `<${tagName}${attrs}>${childrenHtml}</${tagName}>`;
              }
              
              return childrenHtml;
          }
          return null;
      };

      // SPECIAL: Detect Naver Service Scenario List (The accordion list structure user provided)
      const scenarioList = doc.querySelector('[class*="ServiceScenario_scenario_list"]');
      
      if (scenarioList) {
           // If we found a scenario list, we prioritize this structure
           let listHtml = "";
           
           const items = scenarioList.querySelectorAll('li');
           items.forEach(item => {
               // Get Title (Button Text)
               const btn = item.querySelector('button');
               const title = btn?.textContent?.trim() || "";
               
               // Get Content (Div)
               const contentDiv = item.querySelector('[class*="ScenarioListItem_scenario_info"]');
               
               // Check if content exists
               let hasContent = false;
               let cleanedContent = "";
               
               if (contentDiv) {
                   // Only process content if it has actual text/images
                   if(contentDiv.textContent?.trim() || contentDiv.querySelector('img')) {
                       // Clean the inner content using our cleaner
                       // We create a temp div to traverse children cleanly
                       cleanedContent = "";
                       contentDiv.childNodes.forEach(child => {
                           const c = cleanNode(child);
                           if(c) cleanedContent += c;
                       });
                       
                       // Process markers for images within content
                       // Note: Our blocks system splits text and images. 
                       // For nested details, we must keep images inline as HTML <img> tags or handle complexly.
                       // For simplicity in nested details, we revert __IMG__ to <img src="...">
                       cleanedContent = cleanedContent.replace(/__IMG__(.*?)__IMG__/g, '<img src="$1" class="w-full rounded-lg my-2"/>');
                       
                       if (cleanedContent.trim().length > 0) hasContent = true;
                   }
               }
               
               if (hasContent) {
                   // Accordion Style (Details/Summary)
                   listHtml += `
                    <details class="mb-3 group border border-gray-100 rounded-xl overflow-hidden bg-white">
                        <summary class="px-5 py-4 font-bold cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors flex justify-between items-center list-none select-none">
                            <span>${title}</span>
                        </summary>
                        <div class="p-5 text-gray-600 bg-white border-t border-gray-100 prose prose-sm max-w-none">
                            ${cleanedContent}
                        </div>
                    </details>
                   `;
               } else {
                   // Placeholder Accordion Style (Instead of static link)
                   listHtml += `
                    <details class="mb-3 group border border-gray-100 rounded-xl overflow-hidden bg-white">
                        <summary class="px-5 py-4 font-bold cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors flex justify-between items-center list-none select-none">
                            <span>${title}</span>
                        </summary>
                        <div class="p-5 text-gray-400 bg-white border-t border-gray-100 prose prose-sm max-w-none italic">
                            (내용이 없습니다. 이곳을 지우고 내용을 입력해주세요. 원본 페이지에서 내용을 펼치지 않고 복사하면 내용이 누락될 수 있습니다.)
                        </div>
                    </details>
                   `;
               }
           });
           
           if (listHtml) {
               // Add the entire constructed HTML as one block
               blocks.push({ id: Math.random().toString(), type: 'text', content: listHtml });
               
               // If we detected a title from the list, update it
               // Try to find a header before the list
               const prevHeader = scenarioList.previousElementSibling; // or parent's previous
               if(prevHeader && (prevHeader.tagName.startsWith('H') || prevHeader.classList.contains('title'))) {
                   question = prevHeader.textContent?.trim() || "자주 묻는 질문 모음";
               } else if (!question) {
                   question = "도움말 상세 가이드";
               }
               
               setClipperData({ question, blocks });
               return; // Exit standard processing
           }
      }

      // Standard Processing (if not a scenario list)
      let htmlBuffer = "";
      
      doc.body.childNodes.forEach(node => {
          const processed = cleanNode(node);
          if (processed) {
              const parts = processed.split(/(__IMG__.*?__IMG__)/);
              parts.forEach(part => {
                  if (part.startsWith('__IMG__')) {
                      if (htmlBuffer.trim()) {
                          blocks.push({ id: Math.random().toString(), type: 'text', content: htmlBuffer });
                          htmlBuffer = "";
                      }
                      const src = part.replace(/__IMG__/g, '');
                      blocks.push({ id: Math.random().toString(), type: 'image', content: src });
                  } else {
                      htmlBuffer += part;
                  }
              });
          }
      });

      if (htmlBuffer.trim()) {
          blocks.push({ id: Math.random().toString(), type: 'text', content: htmlBuffer });
      }

      setClipperData({ question, blocks });
  };

  const applyClipperData = () => {
      if (!clipperData) return;
      setNewFaqQuestion(clipperData.question);
      setNewFaqBlocks(clipperData.blocks);
      setShowSmartClipper(false);
      setShowFaqModal(true); // Open the main editor with data filled
  };

  const addBlock = (type: 'text' | 'image') => {
    setNewFaqBlocks([...newFaqBlocks, { id: Date.now().toString(), type, content: '' }]);
  };
  const removeBlock = (id: string) => setNewFaqBlocks(newFaqBlocks.filter(b => b.id !== id));
  const updateBlock = (id: string, content: string) => setNewFaqBlocks(newFaqBlocks.map(b => b.id === id ? { ...b, content } : b));
  const moveBlock = (index: number, direction: 'up' | 'down') => {
    const newBlocks = [...newFaqBlocks];
    if (direction === 'up' && index > 0) [newBlocks[index], newBlocks[index - 1]] = [newBlocks[index - 1], newBlocks[index]];
    else if (direction === 'down' && index < newBlocks.length - 1) [newBlocks[index], newBlocks[index + 1]] = [newBlocks[index + 1], newBlocks[index]];
    setNewFaqBlocks(newBlocks);
  };

  const toggleCategorySelection = (cat: string) => {
      if (faqCategoriesSelection.includes(cat)) {
          setFaqCategoriesSelection(prev => prev.filter(c => c !== cat));
      } else {
          setFaqCategoriesSelection(prev => [...prev, cat]);
      }
  };

  const handleAddCategory = async () => {
      if (!newCategoryName.trim()) return;
      await addCategory(newCategoryName);
      setNewCategoryName('');
  };

  // --- Review Management ---
  const triggerReviewImageUpload = () => reviewFileInputRef.current?.click();
  const onReviewFileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (reviewFileInputRef.current) reviewFileInputRef.current.value = '';
    const url = await handleFileUpload(file);
    if (url) setNewReview(prev => ({ ...prev, imageUrl: url, type: 'image' }));
  };

  const handleReviewPaste = async (e: React.ClipboardEvent) => {
    // Only handle paste if type is 'image'
    if (newReview.type !== 'image') return;

    const items = e.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
            e.preventDefault();
            const file = items[i].getAsFile();
            if (file) {
                const url = await handleFileUpload(file);
                if (url) setNewReview(prev => ({ ...prev, imageUrl: url }));
            }
            return;
        }
    }
  };

  const handleAddReview = async () => {
    if (!newReview.name || !newReview.company) return alert("이름과 업체명을 입력해주세요.");
    if (newReview.type === 'text' && !newReview.content) return alert("후기 내용을 입력해주세요.");
    if (newReview.type === 'image' && !newReview.imageUrl) return alert("이미지를 등록해주세요.");

    setIsUploading(true);
    try {
        await addReview({ ...newReview, type: newReview.type as 'text' | 'image' });
        setShowReviewModal(false);
        setNewReview({ name: '', company: '', content: '', rating: 5, type: 'text', imageUrl: '' });
        alert("후기가 등록되었습니다.");
    } catch (e: any) {
        alert(`등록 실패: ${e.message}`);
    } finally {
        setIsUploading(false);
    }
  };

  const servicesList = [
      { id: 'place', name: '플레이스 마케팅', defaultImg: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=800&auto=format&fit=crop" },
      { id: 'clip', name: '네이버 클립', defaultImg: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800&auto=format&fit=crop" },
      { id: 'experience', name: '체험단 마케팅', defaultImg: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=800&auto=format&fit=crop" },
      { id: 'youtube', name: '유튜브 관리', defaultImg: "https://images.unsplash.com/photo-1626544827763-d516dce335ca?q=80&w=800&auto=format&fit=crop" },
      { id: 'instagram', name: '인스타그램', defaultImg: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800&auto=format&fit=crop" },
  ];

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
           <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-brand-black rounded-full flex items-center justify-center text-white">
                 <Lock className="w-8 h-8" />
              </div>
           </div>
           <h2 className="text-2xl font-bold text-center mb-2">관리자 로그인</h2>
           <form onSubmit={handleLogin} className="space-y-4">
              <input type="password" placeholder="Password" className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none" value={password} onChange={(e) => setPassword(e.target.value)} />
              <button disabled={isLoggingIn} className="w-full py-3 bg-brand-accent text-white font-bold rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2">
                 {isLoggingIn && <Loader2 className="w-4 h-4 animate-spin"/>} {isLoggingIn ? '로그인 중...' : '로그인'}
              </button>
           </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {isUploading && (
          <div className="fixed inset-0 bg-black/80 z-[60] flex flex-col items-center justify-center text-white backdrop-blur-sm">
              <div className="bg-white/10 p-8 rounded-2xl flex flex-col items-center max-w-sm w-full mx-4">
                  <Loader2 className="w-12 h-12 animate-spin mb-4 text-brand-accent" />
                  <p className="text-lg font-bold">처리 중입니다...</p>
                  <p className="text-sm opacity-70 mt-2 text-center text-gray-300">잠시만 기다려주세요.<br/>(대용량 데이터는 시간이 걸릴 수 있습니다)</p>
              </div>
          </div>
      )}

      <div className="bg-brand-black text-white px-6 py-4 shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
           <div className="font-bold text-xl flex items-center gap-3">
              <Lock className="w-5 h-5 text-green-400" /> Smart Place Admin
              
              {/* Server Connection Status Badge */}
              {isServerConnected === null ? (
                 <div className="flex items-center gap-1.5 ml-4 bg-white/10 px-3 py-1 rounded-full">
                    <Loader2 className="w-3 h-3 animate-spin text-gray-400"/>
                    <span className="text-xs font-medium text-gray-400">연결 확인 중...</span>
                 </div>
              ) : isServerConnected ? (
                 <div className="flex items-center gap-1.5 ml-4 bg-green-500/20 border border-green-500/30 px-3 py-1 rounded-full">
                    <Wifi className="w-3 h-3 text-green-400" />
                    <span className="text-xs font-bold text-green-400">서버 정상</span>
                 </div>
              ) : (
                 <div className="flex items-center gap-1.5 ml-4 bg-red-500/20 border border-red-500/30 px-3 py-1 rounded-full animate-pulse">
                    <WifiOff className="w-3 h-3 text-red-400" />
                    <span className="text-xs font-bold text-red-400">서버 연결 끊김</span>
                 </div>
              )}
           </div>
           <div className="flex items-center gap-3">
               <button onClick={() => navigate('/admin/mockup')} className="text-sm bg-green-600 px-4 py-2 rounded-full hover:bg-green-700 flex items-center gap-2 font-bold shadow-lg shadow-green-900/20 transition-all border border-green-500" title="캡쳐 도구"><PieChart className="w-4 h-4" /> 캡쳐 도구</button>
               <button onClick={() => window.location.reload()} className="text-sm bg-white/10 px-3 py-2 rounded-full hover:bg-white/20" title="새로고침"><RefreshCw className="w-4 h-4" /></button>
               <button onClick={logout} className="text-sm bg-white/10 px-4 py-2 rounded-full hover:bg-white/20 flex items-center gap-2"><LogOut className="w-4 h-4" /> 로그아웃</button>
           </div>
        </div>
      </div>
      
      {/* Rest of the component ... */}
      <div className="max-w-7xl mx-auto px-6 py-8">
         {/* Warning Banner if Disconnected */}
         {!isServerConnected && isServerConnected !== null && (
             <div className="mb-6 p-4 bg-red-100 border border-red-200 text-red-700 rounded-xl flex items-center gap-3">
                 <WifiOff className="w-6 h-6" />
                 <div>
                     <p className="font-bold">서버와 연결할 수 없습니다.</p>
                     <p className="text-sm">데이터를 불러오거나 저장할 수 없습니다. 잠시 후 새로고침하거나 관리자에게 문의하세요.</p>
                 </div>
             </div>
         )}
         
         {/* ... Tabs and content ... */}
         <div className="flex gap-4 mb-8 border-b border-gray-200 overflow-x-auto">
            {['inquiries', 'main', 'faq', 'reviews'].map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab as any)} className={`pb-4 px-4 font-bold flex items-center gap-2 whitespace-nowrap uppercase ${activeTab === tab ? 'text-brand-accent border-b-2 border-brand-accent' : 'text-gray-400'}`}>
                    {tab === 'inquiries' && <MessageSquare className="w-5 h-5" />}
                    {tab === 'main' && <Layout className="w-5 h-5" />}
                    {tab === 'faq' && <HelpCircle className="w-5 h-5" />}
                    {tab === 'reviews' && <Star className="w-5 h-5" />}
                    {tab}
                </button>
            ))}
         </div>

         {activeTab === 'inquiries' && (
            <div className="space-y-4">
               {inquiries.length === 0 ? <div className="text-center py-20 bg-white rounded-xl text-gray-400">접수된 문의가 없습니다.</div> : inquiries.slice().reverse().map(item => (
                     <div key={item.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6">
                        <div className="flex-1">
                           <div className="flex items-center gap-3 mb-2">
                              <span className={`px-2 py-1 rounded text-xs font-bold ${item.status === 'new' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>{item.status === 'new' ? '신규' : '확인됨'}</span>
                              <span className="text-sm text-gray-400">{item.date}</span>
                              <span className="text-sm font-bold text-gray-800">{item.type}</span>
                           </div>
                           <h3 className="text-xl font-bold mb-1">{item.name} <span className="text-base font-normal text-gray-500">({item.company})</span></h3>
                           <p className="text-brand-accent font-medium mb-3">{item.phone}</p>
                           <p className="bg-gray-50 p-4 rounded-lg text-gray-700 whitespace-pre-line">{item.message}</p>
                        </div>
                        <div className="flex md:flex-col gap-2 justify-center border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6">
                           <button onClick={() => updateInquiryStatus(item.id, 'contacted')} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 text-sm font-bold flex items-center gap-2"><CheckCircle className="w-4 h-4" /> 완료</button>
                           <button onClick={() => updateInquiryStatus(item.id, 'read')} className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-sm font-bold flex items-center gap-2"><Clock className="w-4 h-4" /> 보류</button>
                        </div>
                     </div>
                  ))}
            </div>
         )}
         
         {activeTab === 'main' && (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {servicesList.map(service => (
                     <div key={service.id} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col gap-4">
                         <h4 className="font-bold text-lg">{service.name}</h4>
                         <div className="aspect-[4/5] rounded-lg overflow-hidden border border-gray-100 bg-gray-50 relative group">
                             <img src={serviceImages[service.id] || service.defaultImg} alt={service.name} className="w-full h-full object-cover" />
                             <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors pointer-events-none"></div>
                         </div>
                         <button onClick={() => triggerMainImageUpload(service.id)} className="w-full py-3 bg-gray-800 text-white rounded-lg hover:bg-black font-bold flex items-center justify-center gap-2 disabled:opacity-50 transition-colors" disabled={isUploading || !isServerConnected}>
                            <Upload className="w-4 h-4"/> 이미지 교체
                         </button>
                     </div>
                 ))}
             </div>
         )}

         {activeTab === 'faq' && (
            <div>
                {/* Category Manager Toggle */}
                <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <button onClick={() => setShowCategoryManager(!showCategoryManager)} className="text-gray-500 hover:text-gray-800 flex items-center gap-2 font-medium">
                        <Settings className="w-4 h-4" /> 카테고리 관리 {showCategoryManager ? '접기' : '펼치기'}
                    </button>
                    
                    <div className="flex gap-2">
                        <button onClick={() => setShowSmartClipper(true)} disabled={!isServerConnected} className="px-4 py-3 bg-indigo-500 text-white rounded-lg font-bold flex items-center gap-2 hover:bg-indigo-600 disabled:opacity-50 shadow-md">
                            <Scissors className="w-5 h-5" /> 스마트 웹 클리퍼
                        </button>
                        <button onClick={handleImportNaverFaqs} disabled={!isServerConnected} className="px-4 py-3 bg-green-500 text-white rounded-lg font-bold flex items-center gap-2 hover:bg-green-600 disabled:opacity-50 shadow-md">
                            <Download className="w-5 h-5" /> 추천 질문 가져오기
                        </button>
                        <button onClick={() => { resetFaqForm(); setShowFaqModal(true); }} disabled={!isServerConnected} className="px-6 py-3 bg-brand-black text-white rounded-lg font-bold flex items-center gap-2 hover:bg-gray-800 disabled:opacity-50 shadow-md">
                            <Plus className="w-5 h-5" /> 새 글 작성
                        </button>
                    </div>
                </div>

                {/* Category Manager */}
                {showCategoryManager && (
                    <div className="mb-8 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                        <h4 className="font-bold mb-4">카테고리 편집</h4>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {categories.map(cat => (
                                <div key={cat} className="bg-gray-100 px-3 py-1.5 rounded-full flex items-center gap-2 text-sm">
                                    {cat}
                                    <button onClick={() => { if(confirm(`${cat} 카테고리를 삭제하시겠습니까?`)) deleteCategory(cat) }} className="hover:text-red-500"><X className="w-3 h-3" /></button>
                                </div>
                            ))}
                        </div>
                        <div className="flex gap-2 max-w-sm">
                            <input 
                                type="text" 
                                placeholder="새 카테고리명" 
                                className="flex-1 px-3 py-2 border border-gray-200 rounded-lg outline-none focus:border-brand-accent"
                                value={newCategoryName}
                                onChange={(e) => setNewCategoryName(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleAddCategory()}
                            />
                            <button onClick={handleAddCategory} className="px-4 py-2 bg-gray-800 text-white rounded-lg text-sm font-bold">추가</button>
                        </div>
                    </div>
                )}

               <div className="grid gap-4">
                  {faqs.map(faq => (
                     <div key={faq.id} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex justify-between items-start group hover:border-brand-accent/30 transition-all">
                        <div className="flex-1">
                           <div className="flex flex-wrap gap-2 mb-2">
                                {(faq.categories || []).map(cat => (
                                    <span key={cat} className="inline-block px-2.5 py-0.5 bg-blue-50 text-blue-600 text-xs rounded-full font-bold border border-blue-100">{cat}</span>
                                ))}
                           </div>
                           <h4 className="font-bold text-lg mb-2 text-gray-800">{faq.question}</h4>
                           <p className="text-sm text-gray-400 truncate max-w-md">
                                {faq.blocks && faq.blocks.length > 0 ? (faq.blocks.find(b => b.type === 'text')?.content?.replace(/<[^>]+>/g, '') || '이미지 콘텐츠') : '내용 없음'}
                           </p>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => openFaqModalForEdit(faq)} className="text-gray-400 hover:text-blue-500 p-2 border border-gray-100 rounded-lg hover:bg-blue-50 transition-colors"><Edit3 className="w-4 h-4" /></button>
                            <button onClick={() => { if(confirm('정말 삭제하시겠습니까?')) deleteFaq(faq.id) }} className="text-gray-400 hover:text-red-500 p-2 border border-gray-100 rounded-lg hover:bg-red-50 transition-colors"><Trash2 className="w-4 h-4" /></button>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         )}

         {activeTab === 'reviews' && (
            <div>
               <div className="flex justify-end mb-6">
                  <button onClick={() => setShowReviewModal(true)} disabled={!isServerConnected} className="px-6 py-3 bg-brand-black text-white rounded-lg font-bold flex items-center gap-2 hover:bg-gray-800 disabled:opacity-50"><Plus className="w-5 h-5" /> 후기 등록하기</button>
               </div>
               <div className="grid gap-4">
                  {reviews.map(review => (
                     <div key={review.id} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex justify-between items-start">
                        <div className="flex-1">
                           <div className="flex items-center gap-2 mb-2">
                              <span className="font-bold text-lg">{review.name}</span>
                              <span className="text-sm text-gray-500">{review.company}</span>
                              <span className="text-yellow-400 flex text-xs">{'★'.repeat(review.rating)}</span>
                           </div>
                           {review.type === 'text' ? <p className="text-gray-600 text-sm">"{review.content}"</p> : <div className="flex items-center gap-2 text-blue-500 text-sm"><Camera className="w-4 h-4" /> 인증샷 후기</div>}
                        </div>
                        <button onClick={() => deleteReview(review.id)} className="text-gray-300 hover:text-red-500 p-2"><Trash2 className="w-5 h-5" /></button>
                     </div>
                  ))}
               </div>
            </div>
         )}
      </div>

      <input type="file" ref={faqFileInputRef} onChange={onFaqFileSelected} className="hidden" accept="image/*" />
      <input type="file" ref={reviewFileInputRef} onChange={onReviewFileSelected} className="hidden" accept="image/*" />
      <input type="file" ref={mainImageInputRef} onChange={onMainImageFileSelected} className="hidden" accept="image/*" />

      {/* Smart Web Clipper Modal (Replaces Bulk Text Modal) */}
      {showSmartClipper && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
              <div className="bg-white rounded-2xl w-full max-w-3xl p-8 shadow-2xl flex flex-col max-h-[90vh]">
                  <div className="flex justify-between items-center mb-6">
                      <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                              <Wand2 className="w-6 h-6" />
                          </div>
                          <div>
                              <h3 className="text-2xl font-bold text-gray-900">스마트 웹 클리퍼</h3>
                              <p className="text-sm text-gray-500">웹사이트 내용을 복사(Ctrl+C) 후 아래 상자에 붙여넣기(Ctrl+V) 하세요.</p>
                          </div>
                      </div>
                      <button onClick={() => setShowSmartClipper(false)} className="p-2 hover:bg-gray-100 rounded-full"><X className="w-6 h-6" /></button>
                  </div>

                  {!clipperData ? (
                      <div 
                          className="flex-1 border-2 border-dashed border-indigo-200 rounded-2xl bg-indigo-50/50 flex flex-col items-center justify-center p-12 text-center transition-all hover:border-indigo-400 hover:bg-indigo-50 group cursor-text min-h-[300px]"
                          onPaste={handleSmartClipperPaste}
                          onClick={() => clipperInputRef.current?.focus()}
                          tabIndex={0}
                          ref={clipperInputRef}
                      >
                          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                              <Scissors className="w-8 h-8 text-indigo-400" />
                          </div>
                          <h4 className="text-xl font-bold text-indigo-900 mb-2">이곳을 클릭하고 붙여넣으세요 (Ctrl+V)</h4>
                          <p className="text-indigo-600/70 max-w-md">
                              네이버 도움말, 블로그 등 웹페이지의 텍스트와 이미지를<br/>자동으로 분리하여 가져옵니다.
                          </p>
                          
                          <div className="mt-6 flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-indigo-100 cursor-pointer" onClick={(e) => { e.stopPropagation(); setReplaceColor(!replaceColor); }}>
                              <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${replaceColor ? 'bg-blue-600' : 'bg-gray-200'}`}>
                                  {replaceColor && <CheckCircle className="w-3 h-3 text-white" />}
                              </div>
                              <span className="text-sm text-gray-600 font-bold">네이버 색상(초록)을 브랜드 색상(파랑)으로 변경</span>
                          </div>

                          <div className="flex items-start gap-2 text-amber-600/80 text-xs mt-4 bg-amber-50 p-3 rounded-lg border border-amber-100 max-w-md text-left">
                              <AlertCircle className="w-4 h-4 flex-shrink-0" />
                              <p>
                                  <strong>Tip:</strong> 숨겨진 내용(펼치기/접기)이 있는 경우, 반드시 <u>내용을 펼친 상태</u>에서 복사해야 모든 내용을 가져올 수 있습니다.
                              </p>
                          </div>
                      </div>
                  ) : (
                      <div className="flex-1 overflow-y-auto pr-2 min-h-[300px]">
                          <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 flex items-center gap-3">
                              <CheckCircle className="w-5 h-5 text-green-600" />
                              <div className="text-green-800 text-sm font-medium">
                                  성공적으로 분석했습니다! 내용을 확인하고 편집기로 가져오세요.
                              </div>
                              <button onClick={() => setClipperData(null)} className="ml-auto px-4 py-2 bg-white border border-green-200 rounded-lg text-xs font-bold text-green-700 hover:bg-green-50">
                                  다시 붙여넣기
                              </button>
                          </div>

                          <div className="space-y-6">
                              <div>
                                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">자동 감지된 제목 (질문)</label>
                                  <div className="text-xl font-bold text-gray-900 bg-gray-50 p-4 rounded-xl border border-gray-100">
                                      {clipperData.question}
                                  </div>
                              </div>
                              
                              <div>
                                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">자동 감지된 내용 ({clipperData.blocks.length}개 블록)</label>
                                  <div className="space-y-4">
                                      {clipperData.blocks.map((block, idx) => (
                                          <div key={idx} className="relative group">
                                              {block.type === 'text' ? (
                                                  <div className="p-6 bg-white border border-gray-200 rounded-xl text-gray-700 text-sm whitespace-pre-wrap leading-relaxed shadow-sm" dangerouslySetInnerHTML={{ __html: block.content }}>
                                                  </div>
                                              ) : (
                                                  <div className="rounded-xl overflow-hidden border border-gray-200 bg-gray-50 shadow-sm">
                                                      <img src={block.content} alt={`Block ${idx}`} className="w-full h-auto max-h-[400px] object-contain mx-auto" />
                                                      <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">이미지 자동추출</div>
                                                  </div>
                                              )}
                                          </div>
                                      ))}
                                  </div>
                              </div>
                          </div>
                      </div>
                  )}

                  <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-100">
                      <button onClick={() => setShowSmartClipper(false)} className="px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors text-gray-600">취소</button>
                      <button 
                          onClick={applyClipperData} 
                          disabled={!clipperData}
                          className="px-8 py-3 bg-brand-black text-white rounded-xl font-bold hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                      >
                          편집기로 가져오기 <ArrowRight className="w-4 h-4" />
                      </button>
                  </div>
              </div>
          </div>
      )}

      {/* FAQ Modal - Improved UI (Blog Style) */}
      {showFaqModal && (
        <div className="fixed inset-0 bg-white z-50 overflow-y-auto" onPaste={handleFaqPaste}>
           <div className="max-w-4xl mx-auto px-6 py-10">
              {/* Header */}
              <div className="flex justify-between items-center mb-8 sticky top-0 bg-white/90 backdrop-blur-md py-4 border-b border-gray-100 z-10">
                 <h3 className="text-2xl font-bold text-gray-900">{editingFaqId ? '글 수정하기' : '새 글 작성하기'}</h3>
                 <div className="flex gap-3">
                     <button onClick={resetFaqForm} className="px-5 py-2.5 rounded-full border border-gray-200 text-gray-500 font-bold hover:bg-gray-50">취소</button>
                     <button onClick={handleSaveFaq} className="px-8 py-2.5 rounded-full bg-brand-accent text-white font-bold hover:bg-blue-600 shadow-lg hover:shadow-blue-500/30 transition-all">
                        {editingFaqId ? '수정 완료' : '발행하기'}
                     </button>
                 </div>
              </div>

              <div className="space-y-8 pb-32">
                 {/* Category Selector */}
                 <div>
                    <label className="block text-sm font-bold text-gray-400 mb-3 uppercase tracking-wider">카테고리 선택 (중복 가능)</label>
                    <div className="flex flex-wrap gap-2">
                        {categories.map(cat => (
                            <button 
                                key={cat} 
                                onClick={() => toggleCategorySelection(cat)}
                                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${faqCategoriesSelection.includes(cat) ? 'bg-brand-black text-white shadow-md' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                            >
                                {cat}
                                {faqCategoriesSelection.includes(cat) && <CheckCircle className="inline-block w-3 h-3 ml-2 text-green-400"/>}
                            </button>
                        ))}
                    </div>
                 </div>

                 {/* Title Input */}
                 <div>
                     <input 
                        className="w-full text-4xl font-bold placeholder-gray-300 border-none outline-none py-4 bg-transparent" 
                        placeholder="제목을 입력하세요" 
                        value={newFaqQuestion} 
                        onChange={e => setNewFaqQuestion(e.target.value)} 
                     />
                     <div className="h-px w-20 bg-gray-200 mt-2"></div>
                 </div>

                 {/* Content Editor */}
                 <div className="space-y-6 min-h-[400px]">
                    {newFaqBlocks.map((block, index) => (
                        <div key={block.id} className="group relative transition-all">
                            {/* Hover Controls */}
                            <div className="absolute -right-12 top-0 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-1 p-2">
                                <button onClick={() => moveBlock(index, 'up')} disabled={index === 0} className="p-1.5 text-gray-400 hover:text-brand-accent disabled:opacity-30"><ArrowUp className="w-4 h-4"/></button>
                                <button onClick={() => moveBlock(index, 'down')} disabled={index === newFaqBlocks.length - 1} className="p-1.5 text-gray-400 hover:text-brand-accent disabled:opacity-30"><ArrowDown className="w-4 h-4"/></button>
                                <button onClick={() => removeBlock(block.id)} className="p-1.5 text-gray-400 hover:text-red-500"><X className="w-4 h-4"/></button>
                            </div>

                            {/* Block Content */}
                            {block.type === 'text' ? (
                                <textarea 
                                    className="w-full p-4 text-lg text-gray-700 leading-relaxed outline-none resize-none border-l-2 border-transparent focus:border-gray-200 bg-transparent"
                                    placeholder="내용을 입력하세요..." 
                                    rows={Math.max(2, block.content.split('\n').length)}
                                    value={block.content} 
                                    onChange={(e) => {
                                        updateBlock(block.id, e.target.value);
                                        // Auto-grow height
                                        e.target.style.height = 'auto';
                                        e.target.style.height = e.target.scrollHeight + 'px';
                                    }}
                                    style={{ height: 'auto', minHeight: '80px' }}
                                />
                            ) : (
                                <div className="relative rounded-xl overflow-hidden bg-gray-50 border border-gray-100 group-hover:border-blue-200 transition-colors">
                                    {block.content ? (
                                        <img src={block.content} alt="Content" className="w-full h-auto max-h-[600px] object-contain mx-auto" />
                                    ) : (
                                        <div className="p-8 flex flex-col items-center justify-center text-center">
                                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm">
                                                <ImageIcon className="w-8 h-8 text-gray-400" />
                                            </div>
                                            <p className="font-bold text-gray-700 mb-1">이미지를 등록해주세요</p>
                                            <p className="text-sm text-gray-400 mb-6">
                                                버튼을 눌러 업로드하거나,<br/>
                                                <span className="text-brand-accent font-bold">Ctrl+V</span>로 이미지를 붙여넣으세요.
                                            </p>
                                            
                                            <div className="flex flex-col gap-3 w-full max-w-sm">
                                                <button 
                                                    onClick={() => triggerFaqImageUpload(block.id)} 
                                                    className="px-6 py-2.5 bg-gray-800 text-white rounded-full font-bold hover:bg-black transition-colors flex items-center justify-center gap-2 w-full"
                                                >
                                                    <Upload className="w-4 h-4" /> 파일 선택하기
                                                </button>
                                                
                                                <div className="relative">
                                                    <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                    <input 
                                                        className="w-full border border-gray-200 py-2.5 pl-10 pr-4 rounded-xl outline-none focus:border-brand-accent text-sm bg-white"
                                                        placeholder="이미지 주소(URL) 입력"
                                                        value={block.content}
                                                        onChange={(e) => updateBlock(block.id, e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {block.content && (
                                        <button 
                                            onClick={() => triggerFaqImageUpload(block.id)} 
                                            className="absolute bottom-4 right-4 bg-black/70 text-white px-4 py-2 rounded-lg text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black"
                                        >
                                            이미지 변경
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                    
                    {newFaqBlocks.length === 0 && (
                        <div className="py-20 text-center text-gray-300">
                            작성된 내용이 없습니다. 아래 버튼을 눌러 내용을 추가하세요.
                        </div>
                    )}
                 </div>

                 {/* Sticky Add Buttons */}
                 <div className="fixed bottom-10 left-1/2 -translate-x-1/2 flex gap-4 bg-white/90 backdrop-blur-xl p-2 rounded-full shadow-2xl border border-gray-100 z-20">
                    <button onClick={() => addBlock('text')} className="flex items-center gap-2 px-6 py-3 rounded-full hover:bg-gray-100 text-gray-700 font-bold transition-colors">
                        <Type className="w-5 h-5" /> 텍스트 추가
                    </button>
                    <div className="w-px bg-gray-200 my-2"></div>
                    <button onClick={() => addBlock('image')} className="flex items-center gap-2 px-6 py-3 rounded-full hover:bg-gray-100 text-gray-700 font-bold transition-colors">
                        <ImageIcon className="w-5 h-5" /> 이미지 추가
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default Admin;