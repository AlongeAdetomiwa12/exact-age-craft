import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Share2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface AgeCardProps {
  name: string;
  birthDate: Date;
  zodiacSign: string;
}

const calculateLifeStats = (birthDate: Date) => {
  const now = new Date();
  const ageMs = now.getTime() - birthDate.getTime();
  const ageYears = Math.floor(ageMs / (365.25 * 24 * 60 * 60 * 1000));
  const ageDays = Math.floor(ageMs / (24 * 60 * 60 * 1000));
  const ageHours = Math.floor(ageMs / (60 * 60 * 1000));
  
  // Life expectancy calculation (global average ~73 years)
  const lifeExpectancy = 73;
  const lifeUsedPercent = Math.min((ageYears / lifeExpectancy) * 100, 100);
  const daysRemaining = Math.max((lifeExpectancy - ageYears) * 365, 0);
  
  // Next birthday
  const nextBirthday = new Date(now.getFullYear(), birthDate.getMonth(), birthDate.getDate());
  if (nextBirthday <= now) {
    nextBirthday.setFullYear(now.getFullYear() + 1);
  }
  const daysToNextBirthday = Math.ceil((nextBirthday.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  const nextAge = ageYears + 1;

  return {
    ageYears,
    ageDays,
    ageHours,
    lifeUsedPercent,
    daysRemaining,
    daysToNextBirthday,
    nextAge,
    nextBirthdayDate: nextBirthday,
  };
};

export const AgeCard: React.FC<AgeCardProps> = ({ name, birthDate, zodiacSign }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const stats = calculateLifeStats(birthDate);

  const downloadCard = async () => {
    if (!cardRef.current) return;
    
    setIsGenerating(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: null,
        scale: 2,
        logging: false,
      });
      
      const link = document.createElement('a');
      link.download = `${name.replace(/\s+/g, '-').toLowerCase()}-age-card.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      toast.success('Age Card downloaded!');
    } catch (error) {
      console.error('Error generating card:', error);
      toast.error('Failed to generate card');
    } finally {
      setIsGenerating(false);
    }
  };

  const shareCard = async () => {
    if (!cardRef.current) return;
    
    setIsGenerating(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: null,
        scale: 2,
        logging: false,
      });
      
      canvas.toBlob(async (blob) => {
        if (blob && navigator.share) {
          const file = new File([blob], 'age-card.png', { type: 'image/png' });
          await navigator.share({
            title: `${name}'s Age Card`,
            text: `Check out my age stats!`,
            files: [file],
          });
        } else {
          downloadCard();
        }
      });
    } catch (error) {
      console.error('Error sharing card:', error);
      downloadCard();
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* The actual card that will be captured */}
      <div
        ref={cardRef}
        className="relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-primary via-primary/80 to-accent"
        style={{ width: '100%', maxWidth: '400px' }}
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
        
        <div className="relative z-10 text-white space-y-4">
          {/* Header */}
          <div className="text-center">
            <h2 className="text-2xl font-bold">{name}</h2>
            <p className="text-white/80 text-sm">{zodiacSign} ✨</p>
          </div>

          {/* Main age display */}
          <div className="text-center py-4">
            <div className="text-6xl font-black">{stats.ageYears}</div>
            <div className="text-white/80">years young</div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="bg-white/20 backdrop-blur rounded-lg p-3 text-center">
              <div className="font-bold text-lg">{stats.ageDays.toLocaleString()}</div>
              <div className="text-white/80 text-xs">Days Lived</div>
            </div>
            <div className="bg-white/20 backdrop-blur rounded-lg p-3 text-center">
              <div className="font-bold text-lg">{stats.ageHours.toLocaleString()}</div>
              <div className="text-white/80 text-xs">Hours Lived</div>
            </div>
          </div>

          {/* Birthday countdown */}
          <div className="bg-white/20 backdrop-blur rounded-lg p-3">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-xs text-white/80">Next Birthday</div>
                <div className="font-semibold">Turning {stats.nextAge}</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">{stats.daysToNextBirthday}</div>
                <div className="text-xs text-white/80">days to go</div>
              </div>
            </div>
          </div>

          {/* Life meter */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-white/80">
              <span>Life Journey</span>
              <span>{stats.lifeUsedPercent.toFixed(1)}% explored</span>
            </div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white rounded-full transition-all"
                style={{ width: `${stats.lifeUsedPercent}%` }}
              />
            </div>
            <div className="text-center text-xs text-white/80">
              ~{stats.daysRemaining.toLocaleString()} days of adventure ahead!
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-xs text-white/60 pt-2">
            Generated with ChronoSphere 🌟
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-2">
        <Button
          onClick={downloadCard}
          disabled={isGenerating}
          className="flex-1"
          variant="outline"
        >
          {isGenerating ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Download className="mr-2 h-4 w-4" />
          )}
          Download PNG
        </Button>
        <Button
          onClick={shareCard}
          disabled={isGenerating}
          className="flex-1"
          variant="blue"
        >
          {isGenerating ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Share2 className="mr-2 h-4 w-4" />
          )}
          Share
        </Button>
      </div>
    </div>
  );
};
