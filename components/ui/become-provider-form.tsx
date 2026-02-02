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

const locations = ["pokhara", "Itahari", "Dharan", "Janakpur", "Hetauda", "Butwal", "Nepalgunj", "Ghorahi", "Tulsipur", "Kalaiya", "Jitpur", "Simara", "Kathmandu", "Lalitpur", "Bharatpur", "Birgunj", "Biratnagar"]



export default function BecomeProviderForm() {
  return (
    <form action={becomeProviderAction}>
      {/* <Input name="location" placeholder='location' /> */}
      <Combobox items={locations}>
        <ComboboxInput name='location' placeholder="Select a framework" />
        <ComboboxContent>
          <ComboboxEmpty>No items found.</ComboboxEmpty>
          <ComboboxList>
            {(item) => (
              <ComboboxItem key={item} value={item}>
                {item}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>

      <Input name='bio' placeholder='bio' />
      <Input name='experience' placeholder='experience' type='number' />
      <Button type='submit'>
        Become a provider
      </Button>
    </form>
  )
}
