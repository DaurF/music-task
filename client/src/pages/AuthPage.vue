<script setup lang="ts">
import { Button } from '@/shared/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/shared/ui/card'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs'
import { Toaster } from '@/shared/ui/toast'
import { useToast } from '@/shared/ui/toast/use-toast'
import { computed, reactive } from 'vue'
import { loginUser, registerUser } from '@/api'
import { useUserStore } from '@/stores'
import { useRouter } from 'vue-router'

const { toast } = useToast()

const store = useUserStore()
const router = useRouter()

const registerCredentials = reactive({
  email: null,
  username: null,
  password: null
})
const loginCredentials = reactive({
  username: null,
  password: null
})

async function handleLogin() {
  if (!loginCredentials.username || !loginCredentials.password) {
    return
  }

  try {
    const { username } = await loginUser({
      username: loginCredentials.username,
      password: loginCredentials.password
    })

    store.setUser(username)
    router.push({ name: 'home' })
  } catch (err) {
    toast({
      title: 'Error',
      description: err.response.data
    })
    console.error(err.response.data)
  }

  loginCredentials.username = null
  loginCredentials.password = null
}

async function handleRegister() {
  if (
    !registerCredentials.email ||
    !registerCredentials.username ||
    !registerCredentials.password
  ) {
    return
  }

  try {
    const { username } = await registerUser({
      email: registerCredentials.email,
      username: registerCredentials.username,
      password: registerCredentials.password
    })
    store.setUser(username)
    router.push({ name: 'home' })
  } catch (err) {
    toast({
      title: 'Error',
      description: err.response.data
    })
    console.error(err.response.data)
  }

  registerCredentials.email = null
  registerCredentials.username = null
  registerCredentials.password = null
}
</script>

<template>
  <div class="flex justify-center">
    <Toaster />
    <Tabs default-value="login" class="w-[400px]">
      <TabsList class="grid w-full grid-cols-2">
        <TabsTrigger value="login"> Login </TabsTrigger>
        <TabsTrigger value="register"> Create an account </TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <Card>
          <CardHeader>
            <CardTitle>Sign in</CardTitle>
            <CardDescription> Login to access additional functionality. </CardDescription>
          </CardHeader>
          <CardContent class="space-y-2">
            <div class="space-y-1">
              <Label for="username">Username</Label>
              <Input v-model="loginCredentials.username" placeholder="dauren" id="username" />
            </div>
            <div class="space-y-1">
              <Label for="password">Password</Label>
              <Input v-model="loginCredentials.password" type="password" id="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button @click.prevent="handleLogin">Sign in</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="register">
        <Card>
          <CardHeader>
            <CardTitle>Create an account</CardTitle>
            <CardDescription> Sign up to create an account </CardDescription>
          </CardHeader>
          <CardContent class="space-y-2">
            <div class="space-y-1">
              <Label for="email">Email</Label>
              <Input
                v-model="registerCredentials.email"
                placeholder="dauren@gmail.com"
                id="email"
              />
            </div>
            <div class="space-y-1">
              <Label for="username">Username</Label>
              <Input v-model="registerCredentials.username" placeholder="dauren" id="username" />
            </div>
            <div class="space-y-1">
              <Label for="password">Password</Label>
              <Input v-model="registerCredentials.password" type="password" id="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button @click.prevent="handleRegister">Sign up</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  </div>
</template>
