export const Message = ({
  sender: name,
  text,
}: {
  sender: string
  text: string
}) => {
  return (
    <div
      style={{
        minHeight: '100px',
        width: '100%',
        borderBottom: '1px solid grey',
        display: 'flex',
      }}
    >
      <div
        style={{
          flexBasis: '100px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRight: '1px solid grey',
        }}
      >
        {name}
      </div>
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          paddingLeft: '10px',
        }}
      >
        {text}
      </div>
    </div>
  )
}
