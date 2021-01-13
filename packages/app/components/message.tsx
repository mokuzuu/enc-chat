import { Box } from '@chakra-ui/react'

export const Message = ({
  sender: name,
  text,
}: {
  sender: string
  text: string
}) => {
  return (
    <Box
      paddingTop="2rem"
      paddingBottom="2rem"
      paddingLeft="1rem"
      display="flex"
      borderColor="grey"
      borderWidth="1px"
      marginTop="1rem"
      marginRight="0.5rem"
      marginLeft="0.5rem"
      borderRadius="0.5rem"
    >
      <Box
        flexBasis="5rem"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRight: '1px solid grey',
        }}
      >
        {name}
      </Box>
      <Box
        paddingLeft="1rem"
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {text}
      </Box>
    </Box>
  )
}
