"use client";

import { useSelf, useOthers } from "@liveblocks/react/suspense";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function Avatars() {
  const self = useSelf();
  const others = useOthers();

  const all = [self, ...others];
  return (
    <div className="flex gap-2 items-center">
      <p className="font-light text-sm">Users currently editing this page</p>
      <div className="flex -space-x-5">
        {all.map((other, i) => (
          <Tooltip key={other?.id + i}>
            <TooltipTrigger>
              <Avatar className="border-2 hover:z-50">
                <AvatarImage src={other?.info.avatar} />
                <AvatarFallback>{other?.info.name}</AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent>
              <p>{self?.id === other?.id ? "You" : other?.info.name}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </div>
  );
}
export default Avatars;
