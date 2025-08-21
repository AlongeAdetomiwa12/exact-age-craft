import { useAuth } from './useAuth';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

interface ActivityLog {
  action: string;
  input_date: string;
  output_age: any;
  timestamp: Date;
  userId: string;
}

export const useActivityLogger = () => {
  const { user } = useAuth();

  const logActivity = async (action: string, inputDate: string, outputAge: any) => {
    if (!user) return;

    try {
      await addDoc(collection(db, 'activity_logs'), {
        action,
        input_date: inputDate,
        output_age: outputAge,
        timestamp: new Date(),
        userId: user.id
      } as ActivityLog);
    } catch (error) {
      console.error('Error logging activity:', error);
    }
  };

  return { logActivity };
};