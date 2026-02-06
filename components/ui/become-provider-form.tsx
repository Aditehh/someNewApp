"use client"
import { becomeProviderAction } from '@/lib/actions/actions'
import React from 'react'
import { Input } from './input'
import { Button } from './button'
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"
import { useState } from 'react'

const locations = ["pokhara", "Itahari", "Dharan", "Janakpur", "Hetauda", "Butwal", "Nepalgunj", "Ghorahi", "Tulsipur", "Kalaiya", "Jitpur", "Simara", "Kathmandu", "Lalitpur", "Bharatpur", "Birgunj", "Biratnagar"]



export default function BecomeProviderForm() {

  const [location, setLocation] = useState("")
  const [bio, setBio] = useState("")
  const [experience, setExperience] = useState("")

  const isdisabled = !location || !bio || !experience
  return (



    <form action={becomeProviderAction}>
      {/* THIS is what FormData reads */}
      <Input name="location" value={location} placeholder='location' onChange={(e) => setLocation(e.target.value)} />


      <Input
        name="bio"
        placeholder='bio'
        value={bio}
        onChange={(e) => setBio(e.target.value)}
      />

      <Input
        name="experience"
        placeholder='experience'
        type="number"
        value={experience}
        onChange={(e) => setExperience(e.target.value)}
      />

      <Button type="submit" disabled={isdisabled}>Become a provider</Button>

    </form>

  )
}


// "use client"

// import * as React from "react"
// import { useState } from "react"
// import { becomeProviderAction } from "@/lib/actions/actions"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
//   CardDescription,
// } from "@/components/ui/card"
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover"
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
// } from "@/components/ui/command"
// import { Check, ChevronsUpDown } from "lucide-react"
// import { cn } from "@/lib/utils"

// const locations = [
//   "Pokhara",
//   "Itahari",
//   "Dharan",
//   "Janakpur",
//   "Hetauda",
//   "Butwal",
//   "Nepalgunj",
//   "Ghorahi",
//   "Tulsipur",
//   "Kalaiya",
//   "Jitpur",
//   "Simara",
//   "Kathmandu",
//   "Lalitpur",
//   "Bharatpur",
//   "Birgunj",
//   "Biratnagar",
// ]

// export default function BecomeProviderForm() {
//   const [location, setLocation] = useState("")
//   const [bio, setBio] = useState("")
//   const [experience, setExperience] = useState("")

//   const isDisabled = !location || !bio || !experience

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
//       <Card className="w-full max-w-md shadow-lg">
//         <CardHeader>
//           <CardTitle>Become a Provider</CardTitle>
//           <CardDescription>
//             Tell us a bit about yourself so clients can find you.
//           </CardDescription>
//         </CardHeader>

//         <CardContent>
//           <form
//             action={becomeProviderAction}
//             className="space-y-6"
//           >
//             {/* Location */}
//             <div className="space-y-2">
//               <label className="text-sm font-medium">
//                 Location
//               </label>

//               {/* Hidden input so FormData works */}
//               <input type="hidden" name="location" value={location} />

//               <Popover>
//                 <PopoverTrigger asChild>
//                   <Button
//                     variant="outline"
//                     role="combobox"
//                     className="w-full justify-between"
//                   >
//                     {location || "Select location"}
//                     <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//                   </Button>
//                 </PopoverTrigger>
//                 <PopoverContent className="w-full p-0">
//                   <Command>
//                     <CommandInput placeholder="Search location..." />
//                     <CommandEmpty>No location found.</CommandEmpty>
//                     <CommandGroup>
//                       {locations.map((loc) => (
//                         <CommandItem
//                           key={loc}
//                           value={loc}
//                           onSelect={() => setLocation(loc)}
//                         >
//                           <Check
//                             className={cn(
//                               "mr-2 h-4 w-4",
//                               location === loc ? "opacity-100" : "opacity-0"
//                             )}
//                           />
//                           {loc}
//                         </CommandItem>
//                       ))}
//                     </CommandGroup>
//                   </Command>
//                 </PopoverContent>
//               </Popover>
//             </div>

//             {/* Bio */}
//             <div className="space-y-2">
//               <label className="text-sm font-medium">
//                 Short Bio
//               </label>
//               <Input
//                 name="bio"
//                 placeholder="Briefly describe your services"
//                 value={bio}
//                 onChange={(e) => setBio(e.target.value)}
//               />
//             </div>

//             {/* Experience */}
//             <div className="space-y-2">
//               <label className="text-sm font-medium">
//                 Years of Experience
//               </label>
//               <Input
//                 name="experience"
//                 type="number"
//                 min={0}
//                 placeholder="e.g. 3"
//                 value={experience}
//                 onChange={(e) => setExperience(e.target.value)}
//               />
//             </div>

//             {/* Submit */}
//             <Button
//               type="submit"
//               className="w-full"
//               disabled={isDisabled}
//             >
//               Become a Provider
//             </Button>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }

