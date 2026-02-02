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
  {/* hidden real input */}
  <input type="hidden" name="location" value={location} />

  <Combobox items={locations}>
    <ComboboxInput
      value={location}
      onChange={(e) => setLocation(e.target.value)}
      placeholder="Select a location"
    />

    <ComboboxContent>
      <ComboboxEmpty>No items found.</ComboboxEmpty>
      <ComboboxList>
        {(item) => (
          <ComboboxItem
            key={item}
            value={item}
            onSelect={() => setLocation(item)}
          >
            {item}
          </ComboboxItem>
        )}
      </ComboboxList>
    </ComboboxContent>
  </Combobox>

  <Input name="bio" value={bio} onChange={(e) => setBio(e.target.value)} />
  <Input
    name="experience"
    value={experience}
    onChange={(e) => setExperience(e.target.value)}
    type="number"
  />

  <Button type="submit" disabled={isdisabled}>
    Become a provider
  </Button>
</form>

  )
}
