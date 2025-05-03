// Updated: Responsive Workspace with mobile toggles for AssistantList and AssistantSettings
"use client";
import React, { useState } from 'react';
import AssistantList from './_components/AssistantList';
import AssistantSettings from './_components/AssistantSettings';
import ChatUi from './_components/ChatUi';
import { Button } from '@/components/ui/button';

function Workspace() {
  const [showList, setShowList] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="h-screen fixed w-full">
      {/* Mobile Controls */}
      <div className="md:hidden flex justify-between p-2 gap-2">
        <Button onClick={() => {
          setShowList(!showList);
          setShowSettings(false);
        }} variant="outline" size="sm">
          {showList ? 'Hide Assistants' : 'Show Assistants'}
        </Button>
        <Button onClick={() => {
          setShowSettings(!showSettings);
          setShowList(false);
        }} variant="outline" size="sm">
          {showSettings ? 'Hide Settings' : 'Show Settings'}
        </Button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 h-[calc(100%-3rem)] md:h-full relative">
        {/* AssistantList */}
        <div className={`absolute z-20 bg-white w-full h-full md:static md:block ${showList ? 'block' : 'hidden'} md:col-span-1 border-r overflow-auto`}>
          <AssistantList />
        </div>

        {/* ChatUi */}
        <div className="md:col-span-4 lg:col-span-3 overflow-auto">
          <ChatUi />
        </div>

        {/* AssistantSettings */}
        <div className={`absolute z-20 bg-white w-full h-full md:static lg:block ${showSettings ? 'block' : 'hidden'} lg:col-span-1 border-l overflow-auto`}>
          <AssistantSettings />
        </div>
      </div>
    </div>
  );
}

export default Workspace;
