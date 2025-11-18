-- Fix conflicting payment INSERT policies
-- Remove the policy that allows users to insert their own payments
-- This ensures only backend services with service role can create payment records

DROP POLICY IF EXISTS "Users can insert their own payments" ON public.payments;

-- Verify only the secure policy remains:
-- "Only system can create payments" with WITH CHECK (false)
-- This blocks all direct user inserts, requiring backend service role access

COMMENT ON TABLE public.payments IS 'Payment records - immutable and secure. Users can only view their own payments. All inserts must go through backend services with service role access. No direct user modifications allowed.';