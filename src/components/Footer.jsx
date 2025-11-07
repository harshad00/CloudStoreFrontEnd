import React from 'react'
import { Cloud } from "lucide-react";

function Footer() {
  return (
    <div>
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Cloud className="h-5 w-5 text-primary" />
              <span className="font-semibold">CloudStore</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 CloudStore. All rights reserved.
            </p>
          </div>
        </div>
  )
}

export default Footer
