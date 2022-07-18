import twilio from 'twilio';
import { supabase } from '../../src/utils/subabaseClient';

const VITE_PUBLIC_TWILIO_ACCOUNT_SID = process.env.VITE_PUBLIC_TWILIO_ACCOUNT_SID
const VITE_PUBLIC_TWILIO_API_KEY = process.env.VITE_PUBLIC_TWILIO_API_KEY
const VITE_PUBLIC_TWILIO_API_SECRET = process.env.VITE_PUBLIC_TWILIO_API_SECRET
const SERVICE_SID = process.env.VITE_PUBLIC_SERVICE_SID

import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  accessToken: string | string[]
} | string

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  console.log('VITE_PUBLIC_TWILIO_ACCOUNT_SID', VITE_PUBLIC_TWILIO_ACCOUNT_SID)
  console.log('VITE_PUBLIC_TWILIO_API_KEY', VITE_PUBLIC_TWILIO_API_KEY)
  console.log('VITE_PUBLIC_TWILIO_API_SECRET', VITE_PUBLIC_TWILIO_API_SECRET)
  // console.log('VITE_PUBLIC_SERVICE_SID', VITE_PUBLIC_SERVICE_SID)

  const jwt = req.headers.jwt as string;
  if (jwt == null) return res.status(401).json('not Allowed')

  // const identity = jwt.startsWith('anonymous')
  //   ? jwt.split('_')[1]
  //   : null

  const user = await supabase.auth.api.getUser(jwt)
  const identity = user?.data?.user_metadata.userName

  if (identity == null) return res.status(401).json('not Allowed')

  const { AccessToken } = twilio.jwt
  const { ChatGrant } = AccessToken


  try {
    const access = new AccessToken(
      VITE_PUBLIC_TWILIO_ACCOUNT_SID || '',
      VITE_PUBLIC_TWILIO_API_KEY || '',
      VITE_PUBLIC_TWILIO_API_SECRET || '',
      { identity }
    )

    const conversationsGrant = new ChatGrant({
      serviceSid: SERVICE_SID
    })

    access.addGrant(conversationsGrant)


    res.status(200).json({ accessToken: access.toJwt() })
  } catch (err) {
    console.log('err', err)
  }

}
