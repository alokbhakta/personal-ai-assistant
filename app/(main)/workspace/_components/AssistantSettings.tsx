"use client"
import { AssistantContext } from '@/context/AssistantContext'
import Image from 'next/image';
import React, { useContext, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import AiModelOptions from '@/services/AiModelOptions';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2Icon, Save, Trash } from 'lucide-react';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';
import ConfirmationAlert from './ConfirmationAlert';
import { BlurFade } from '@/components/magicui/blur-fade';
  

function AssistantSettings() {
    const {assistant,setAssistant}=useContext(AssistantContext);
    const UpdateAssistant=useMutation(api.userAiAssistants.UpdateUserAiAssistant);
    const DeleteAssistant = useMutation(api.userAiAssistants.DeleteAssistant);
    const [loading,setLoading] = useState(false);
    const onHandleInputChange=(field:string,value:string)=>{
      setAssistant((prev:any)=>({
        ...prev,
        [field]:value
      }))
    }

    const OnSave= async()=>{
      setLoading(true);

      const result = await UpdateAssistant({
        id:assistant?._id,
        aiModelId:assistant?.aiModelId,
        userInstruction:assistant?.userInstruction
      })
      toast('Saved!')
      setLoading(false);
    }

    const OnDelete = async() => {
      setLoading(true);
      await DeleteAssistant({
        id:assistant?._id
      })
      setAssistant(null);
      setLoading(false);
    }

  return assistant&&(
    <div className='p-5 bg-secondary border-l-[1px] h-screen bg-gray-300'>
      <h2 className='font-bold text-2xl'>Settings</h2>
      <BlurFade delay={0.25}>
      <div className='mt-4 flex gap-3'>
        <Image src={assistant?.image} alt='assistant' 
           width={100}
           height={100}
           className='rounded-xl h-[90px] w-[90px]'
        />
        <div>
          <h2 className='font-bold'>{assistant?.name}</h2>
          <p className='text-gray-700 dark:text-gray-300'>{assistant?.title}</p>
        </div>
      </div>
       </BlurFade>
      <div className='mt-4'>
      <BlurFade delay={0.25*2}>
        <h2 className='font-bold text-gray-600'>Model:</h2>
        <Select defaultValue={assistant.aiModelId} onValueChange={(value)=>onHandleInputChange('aiModelId',value)}>
            <SelectTrigger className="w-full bg-white">
            <SelectValue placeholder="Select Model" />
            </SelectTrigger>
            <SelectContent>
                {AiModelOptions.map((model, index)=>(
                    <SelectItem value={model.edenAi}>
                        <div key={index} className='flex gap-2 items-center m-1'>
                            <Image src={model.logo} alt={model.name}
                                width={20} height={20}
                            />
                            <h2>{model.name}</h2>
                        </div>
                    </SelectItem>
                ))}
            
            </SelectContent>
        </Select>
        </BlurFade>
      </div>

      <div className='mt-4'>
      <BlurFade delay={0.25*3}>
        <h2 className='font-bold text-gray-600'>Instruction:</h2>
        <Textarea className='bg-white h-[180px]' placeholder='Add Instruction' value={assistant?.userInstruction} 
          onChange={(e)=>onHandleInputChange('userInstruction',e.target.value)}
        />
        </BlurFade>
      </div>
      
      <div className='absolute bottom-10 right-8 flex gap-5'>
      <BlurFade delay={0.25*4}>
        <ConfirmationAlert OnDelete={OnDelete}>
        <Button variant="ghost" disabled={loading}><Trash/>Delete</Button>
        </ConfirmationAlert>
        <Button onClick={OnSave} disabled={loading}>{loading?<Loader2Icon className='animate-spin'/>:<Save/>} Save</Button>
        </BlurFade>
      </div>
      
    </div>
  )
}

export default AssistantSettings
