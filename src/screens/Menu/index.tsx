// import React from 'react'
// import { Modal } from 'react-native'
// import { appThemes } from '../../themes'

// import {
//     Frame,
//     Container,
//     Title,
//     ButtonLabel,
//     Button,
// } from './styles'

// type MenuProps = {
//     isVisible: boolean,
//     onCancel: () => void,
//     onThemeSelected: (theme: appThemes) => void,
//     onSaveGame: () => void,
//     onSaveSetting: () => void,
//     onDeleteGame: () => void,
//     onDeleteSetting: () => void,
//     onGiveHint: () => void,
// }

// type ButtonProps = {
//     style?: appThemes,
//     text: string,
//     onClick: () => void,
//     onLongClick?: () => void,
// }

// const OptionButton = (props: ButtonProps) => (
//     <Button style={props.style ? props.style : null}
//         onPress={props.onClick}
//         onLongPress={props.onLongClick ? props.onLongClick : props.onClick}>
//         <ButtonLabel style={props.style}>{props.text}</ButtonLabel>
//     </Button>
// )

// export default (props: MenuProps) => {
//     return (
//         <Modal
//             onRequestClose={props.onCancel}
//             visible={props.isVisible}
//             animationType='fade'
//             transparent={true}>
//             <Frame>
//                 <Container>
//                     <Title>Jogo:</Title>
//                     <OptionButton text='Dica' onClick={props.onGiveHint}/>
//                     <Title>Tema:</Title>
//                     <OptionButton style={'light'} text='Claro' onClick={() => props.onThemeSelected('light')} />
//                     <OptionButton style={'dark'} text='Escuro' onClick={() => props.onThemeSelected('dark')} />
//                     <OptionButton style={'retro'} text='Retrô' onClick={() => props.onThemeSelected('retro')} />
//                     <Title>Opções:</Title>
//                     <OptionButton text='Salvar Jogo' onClick={props.onSaveGame} />
//                     <OptionButton text='Salvar Preferências' onClick={props.onSaveSetting} />
//                     <OptionButton text='Deletar Jogo' onClick={props.onDeleteGame} />
//                     <OptionButton text='Deletar Preferências' onClick={props.onDeleteSetting} />
//                 </Container>
//             </Frame>
//         </Modal>
//     )
// }
export {};
