import { Client } from '@twilio/conversations';

export const createOrJoinConversation = async (
  { room, accessToken }: { room: string, accessToken: string }
) => {
  const client = new Client(accessToken)

  return new Promise(resolve => {
    client.on('stateChanged', async state => {
      if (state === 'initialized') {
        let conversation

        try {
          conversation = await client.createConversation({ uniqueName: room })

          // await conversation?.add('ma')
          // await conversation?.add('mb')

        } catch (e) {
          console.log('error1', e)
          console.error(e)

          try {
            conversation = await client.getConversationByUniqueName(room)
            // await conversation?.add('mb')
          } catch (e) {
            console.log('error1', e)
            console.error(e)
          }
        }

        conversation?.add('ma');
        conversation?.join();

        console.log(conversation)

        resolve(conversation)
      }
    })
  })
}

export const getConversation = (uniqueName: string, token?: string) => {

  if (!token) throw new Error('not Authenticated')

  const client = new Client(token);
  return client.getConversationByUniqueName(uniqueName)

}

export const getConversations = (token?: string) => {

  if (!token) throw new Error('not Authenticated')

  const client = new Client(token);
  return client.getSubscribedConversations();

}
