import React, { useRef, useState, useEffect, useCallback } from 'react';
import { PenTool, RotateCcw, Check, AlertCircle } from 'lucide-react';

export default function SignaturePad({ onSignatureChange, error }) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);
  const hasSignatureRef = useRef(false);
  const lastPoint = useRef({ x: 0, y: 0 });

  // Configure context settings
  const applyContextStyles = useCallback((ctx) => {
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 2.6;
    ctx.strokeStyle = '#0F172A'; // Dark elegant ink
    ctx.fillStyle = '#0F172A';
  }, []);

  // Initialize and resize canvas with signature preservation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      const dpr = window.devicePixelRatio || 1;
      const targetWidth = Math.round(rect.width * dpr);
      const targetHeight = Math.round(rect.height * dpr);

      // Only resize if dimensions actually changed
      if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
        // Preserve signature if already drawn
        let tempImgData = null;
        if (hasSignatureRef.current && canvas.width > 0 && canvas.height > 0) {
          try {
            tempImgData = canvas.toDataURL('image/png');
          } catch {
            // ignore
          }
        }

        canvas.width = targetWidth;
        canvas.height = targetHeight;
        ctx.scale(dpr, dpr);
        applyContextStyles(ctx);

        if (tempImgData) {
          const img = new Image();
          img.onload = () => {
            ctx.drawImage(img, 0, 0, rect.width, rect.height);
          };
          img.src = tempImgData;
        }
      } else {
        applyContextStyles(ctx);
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [applyContextStyles]);

  // Extract coordinates from PointerEvent
  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handlePointerDown = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Capture pointer so moving outside canvas boundary keeps drawing
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // ignore
    }

    const ctx = canvas.getContext('2d');
    applyContextStyles(ctx);

    const { x, y } = getCoordinates(e);
    lastPoint.current = { x, y };
    setIsDrawing(true);
    hasSignatureRef.current = true;
    setHasSignature(true);

    // Draw single dot in case of tap
    ctx.beginPath();
    ctx.arc(x, y, 1.3, 0, Math.PI * 2);
    ctx.fill();
  };

  const handlePointerMove = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const { x, y } = getCoordinates(e);

    ctx.beginPath();
    ctx.moveTo(lastPoint.current.x, lastPoint.current.y);
    ctx.lineTo(x, y);
    ctx.stroke();

    lastPoint.current = { x, y };
  };

  const handlePointerUp = (e) => {
    if (!isDrawing) return;
    setIsDrawing(false);

    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch {
      // ignore
    }

    const canvas = canvasRef.current;
    if (canvas && hasSignatureRef.current) {
      const dataUrl = canvas.toDataURL('image/png');
      onSignatureChange(dataUrl);
    }
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    hasSignatureRef.current = false;
    setHasSignature(false);
    onSignatureChange(null);
  };

  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <PenTool className="w-3.5 h-3.5 text-amber-400" />
          Assinatura Digital no Celular / Mouse:
        </label>

        {hasSignature ? (
          <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
            <Check className="w-3.5 h-3.5" /> Assinado
          </span>
        ) : (
          <span className="text-[11px] text-amber-400">
            Desenhe no quadro abaixo
          </span>
        )}
      </div>

      {/* Signature Canvas Box */}
      <div
        className={`relative rounded-2xl overflow-hidden border transition-all ${
          error
            ? 'border-rose-500 ring-1 ring-rose-500'
            : hasSignature
            ? 'border-emerald-500/50'
            : 'border-slate-700 hover:border-amber-500/50'
        }`}
      >
        {/* Background light paper styling */}
        <div className="bg-[#FAF8F5] relative h-40 sm:h-44 w-full touch-none select-none">
          <canvas
            ref={canvasRef}
            className="w-full h-full signature-canvas cursor-crosshair select-none touch-none block"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
          />

          {/* Guidelines inside canvas */}
          <div className="absolute inset-x-8 bottom-10 border-b border-dashed border-slate-300 pointer-events-none flex items-center justify-between">
            <span className="text-[10px] text-slate-400 tracking-wider">
              X __________________________________________________
            </span>
            <span className="text-[9px] uppercase tracking-wider text-slate-400 font-medium">
              Assine aqui
            </span>
          </div>

          {!hasSignature && !isDrawing && (
            <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center text-slate-400/80 gap-1">
              <PenTool className="w-5 h-5 text-slate-400 stroke-1" />
              <p className="text-xs font-medium">
                Pressione com o dedo ou mouse e deslize para assinar
              </p>
            </div>
          )}
        </div>

        {/* Canvas Toolbar */}
        <div className="bg-slate-900 px-3 py-2 flex items-center justify-between border-t border-slate-800">
          <span className="text-[10px] text-slate-400">
            Validade jurídica garantida pela MP 2.200-2/2001
          </span>
          <button
            type="button"
            onClick={handleClear}
            disabled={!hasSignature}
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-300 hover:text-amber-300 disabled:opacity-40 disabled:hover:text-slate-300 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Limpar Assinatura
          </button>
        </div>
      </div>

      {error && (
        <p className="text-[11px] text-rose-400 flex items-center gap-1 pl-1">
          <AlertCircle className="w-3 h-3" /> {error}
        </p>
      )}
    </div>
  );
}
