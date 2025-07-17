import { useState } from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/context/AuthContext"
import { useNavigate } from "react-router"
import axios from "axios"

export const AuthenForm = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  const [state, setState] = useState("SIGN_IN");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { login } = useAuth()

  const handleOnClick = () => {
    if (state === "SIGN_IN") {
      login(username, password, () => {
        navigate("/notes")
      })
    };

    if (state === "SIGN_UP") {
      axios.post("http://localhost:3000/users/sign-up", { username, password })
        .then(() => {
          setState("SIGN_IN")
          setUsername("")
          setPassword("")
        })
        .catch((err) => console.log(err))
    };
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <div>
          <div>
            <h1 className="text-2xl font-bold text-center">YAME</h1>
            <p className="text-base text-center">Yet Another Markdown Editor</p>
            <p className="text-xs text-center">A Note-Taking app for Code Engine Assignment</p>
          </div>

          <div className="flex justify-center">
            <div className="p-2 mt-5  border w-fit rounded-md">
              <Button className="rounded-none" variant={state === "SIGN_IN" ? "secondary" : "outline"} size="sm"
                onClick={() => { setState("SIGN_IN") }}>Login</Button>
              <Button className="rounded-none" variant={state === "SIGN_UP" ? "secondary" : "outline"} size="sm"
                onClick={() => { setState("SIGN_UP") }}>Sign up</Button>
            </div>
          </div>
        </div>

        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Username</Label>
                <Input id="username" required
                  value={username} onChange={(e) => setUsername(e.target.value)} />

              </div>
              <div className="grid gap-3">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required
                  value={password} onChange={(e) => setPassword(e.target.value)} />

              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full" onClick={(e) => {
                  e.preventDefault()
                  handleOnClick()
                }}>
                  {state === "SIGN_IN" ? "Login" : "Sign up"}
                </Button>

              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
