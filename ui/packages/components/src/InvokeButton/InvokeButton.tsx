import { useCallback, useState, type ComponentProps } from 'react';
import { Button } from '@inngest/components/Button';
import { InvokeModal } from '@inngest/components/InvokeButton';
import { RiFlashlightFill } from '@remixicon/react';

type Props = {
  disabled?: boolean;
  doesFunctionAcceptPayload: boolean;
  btnAction: (data: Record<string, unknown>) => void;
  btnAppearance?: ComponentProps<typeof Button>['appearance'];
};

export function InvokeButton({
  disabled,
  doesFunctionAcceptPayload: hasEventTrigger,
  btnAction,
  btnAppearance,
}: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onConfirm = useCallback(
    ({ data }: { data: Record<string, unknown> }) => {
      setIsModalOpen(false);
      btnAction(data);
    },
    [setIsModalOpen, btnAction]
  );

  return (
    <>
      <Button
        btnAction={() => setIsModalOpen(true)}
        disabled={disabled}
        icon={<RiFlashlightFill className="text-sky-500" />}
        label="Invoke"
        appearance={btnAppearance}
      />

      <InvokeModal
        doesFunctionAcceptPayload={hasEventTrigger}
        isOpen={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onConfirm={onConfirm}
      />
    </>
  );
}
