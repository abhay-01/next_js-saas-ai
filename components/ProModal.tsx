
import {useProModal} from "../hooks/useProModal";
import {Dialog, DialogHeader,DialogContent, DialogTitle,DialogDescription} from "../components/ui/dialog"
import { Badge } from "./ui/badge";

export const ProModal = () => {
    const {isOpen, closeModal} = useProModal();

    const proModal = useProModal();
    return (
      <Dialog open = {proModal.isOpen} onOpenChange={proModal.closeModal}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle className="flex justify-center items-center items-center flex-col gap-y-4 pb-2">
                  <div className = "flex items-center gap-x-2 font-bold py-1">
               Upgarde to Navyug
               <Badge className="text-sm py-1" variant = "premium">
                PRO
               </Badge>
               </div>
                </DialogTitle>
                <DialogDescription classaName = "text-center pt-2 space-y-2 text-zinc-900 font-medium">
                  Hello
                  </DialogDescription>


            </DialogHeader>
        </DialogContent>

      </Dialog>
    );
}