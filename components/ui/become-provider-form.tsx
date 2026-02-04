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

    // <form action={becomeProviderAction}>
    //   <input name="location" defaultValue="Pokhara" />
    //   <input name="bio" defaultValue="Test bio" />
    //   <input name="experience" defaultValue="2" />
    //   <button type="submit">Submit</button>
    // </form>

    <form action={becomeProviderAction}>
      {/* THIS is what FormData reads */}
      <Input name="location" value={location} placeholder='location' onChange={(e) => setLocation(e.target.value)} />

      {/* 
      <Combobox items={locations}>
        <ComboboxInput
          placeholder="Select location"
          // value={location}
          readOnly  
        />

        <ComboboxContent>
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
      </Combobox> */}

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
