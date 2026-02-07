"use client"
import { Input } from './input'
import { Button } from './button'
import { submitVerificationRequestAction } from '@/lib/actions/actions'


export default function ProviderVerificationForm() {
  
  return (
    <div>
      <form action={submitVerificationRequestAction}>
        <select name="documentType" required>
          <option value="">Select your document Type</option>
          <option value="CITIZENSHIP">Citizenship</option>
          <option value="NATIONAL_ID">National Id</option>
          <option value="PASSPORT">Passport </option>
        </select>
        <Input type="text" name='documentNumber' required placeholder='Enter your respective documents id' />

        <Button className='w-full' >
          Submit Request
        </Button>

      </form>
    </div>
  )
}



// "use client"

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
// import { submitVerificationRequestAction } from "@/lib/actions/actions"

// export default function ProviderVerificationForm() {
//   return (
//     <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
//       <Card className="w-full max-w-md shadow-lg">
//         <CardHeader>
//           <CardTitle>Provider Verification</CardTitle>
//           <CardDescription>
//             Submit a valid government-issued document to verify your account.
//           </CardDescription>
//         </CardHeader>

//         <CardContent>
//           <form
//             action={submitVerificationRequestAction}
//             className="space-y-6"
//           >
//             {/* Document Type */}
//             <div className="space-y-2">
//               <label className="text-sm font-medium">
//                 Document Type
//               </label>

//               <Select name="documentType" required>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select your document type" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="CITIZENSHIP">Citizenship</SelectItem>
//                   <SelectItem value="NATIONAL_ID">National ID</SelectItem>
//                   <SelectItem value="PASSPORT">Passport</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             {/* Document Number */}
//             <div className="space-y-2">
//               <label className="text-sm font-medium">
//                 Document Number
//               </label>
//               <Input
//                 type="text"
//                 name="documentNumber"
//                 required
//                 placeholder="Enter your document number"
//               />
//             </div>

//             {/* Submit */}
//             <Button type="submit" className="w-full">
//               Submit Request
//             </Button>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }
