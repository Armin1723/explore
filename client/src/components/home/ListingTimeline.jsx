import { useState } from 'react';
import { Stepper, Button, Group } from '@mantine/core';
import { PiListThin } from 'react-icons/pi';
import { MdApproval } from 'react-icons/md';
import { FaThumbsUp } from 'react-icons/fa';

export const ListingTimeline = () => {
  const [active, setActive] = useState(1);
  const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <div rounded='lg' shadodw='md' className='flex items-center justify-center flex-col h-full w-1/2 max-sm:w-full '>
        <p  className='text-2xl max-sm:text-xl w-full py-6 text-center'>Go Live in 3 easy steps.</p>
      <Stepper active={active} onStepClick={setActive} className='flex flex-col gap-12 '>
        <Stepper.Step label="First step" className='text-center max-sm:w-full max-sm:px-12' description="Create an account" icon={<PiListThin/>}>
          Step 1 : Create a listing using basic details like name, address, description and photos.
        </Stepper.Step>
        <Stepper.Step label="Second step" className='text-center max-sm:w-full max-sm:px-12' description="Wait Approval" icon={<MdApproval/>}>
          Step 2 : Wait for approval from admin through your mail.
        </Stepper.Step>
        <Stepper.Step label="Final step" className='text-center max-sm:w-full max-sm:px-12' description="Get full access" icon={<FaThumbsUp/>}>
          Step 3 : Once you get approval email, you are done.
        </Stepper.Step>
        <Stepper.Completed>
          Your listing is now live. Yayy!!
        </Stepper.Completed>
      </Stepper>

      <Group justify="center" mt="xl">
        <Button variant="default" onClick={prevStep}>Back</Button>
        <Button onClick={nextStep}>Next step</Button>
      </Group>
    </div>
  );
}