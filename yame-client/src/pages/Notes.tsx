import { useState } from "react"
import MDEditor from '@uiw/react-md-editor';
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

function Notes() {
  const { logout } = useAuth();
  const [value, setValue] = useState("")

  return (
    <div className="radient-bg">
      <div className="max-w-7xl mx-auto">

        <div className="flex justify-between items-center px-4">
          <div className="my-5">
            <h1 className="text-3xl font-bold">
              YAME <span className="text-xl">(Yet Another Markdown Editor)</span>
            </h1>
            <p className="text-lg">
              A Note-Taking app for Code Engine Assignment
            </p>
          </div>

          <Button onClick={logout}>Logout</Button>
        </div>

        <div className="grid grid-cols-[1fr_3fr] gap-3">
          <div className="bg-white rounded-md">

          </div>

          <MDEditor
            style={{ minHeight: "50vh" }}
            value={value}
            preview="preview"
            onChange={(value) => setValue(value as string)}
          />
        </div>

        {/* <MDEditor.Markdown source={value} style={{ whiteSpace: "pre-wrap" }} /> */}
      </div>
    </div>
  )
}

export default Notes
