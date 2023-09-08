// import React from 'react'
// import { Modal } from 'react-native'

// import {
//     Frame,
//     Container,
//     Title,
//     Button,
//     ButtonLabel,
// } from './styles'

// type LevelButtonProps = {
//     color: 'easy' | 'medium' | 'hard',
//     text: string,
//     onClick: () => void,
// }

// type LevelSelectProps = {
//     isVisible: boolean,
//     onLevelSelected: (mineDensity: number) => void,
//     onCancel: () => void,
// }

// const LevelButton = (props: LevelButtonProps) => (
//     <Button color={props.color} onPress={props.onClick}>
//         <ButtonLabel>{props.text}</ButtonLabel>
//     </Button>
// )

// export default (props: LevelSelectProps) => {
//     return (
//         <Modal
//             onRequestClose={props.onCancel}
//             visible={props.isVisible}
//             animationType='fade'
//             transparent={true}>
//             <Frame>
//                 <Container>
//                     <Title>Selecione o Nível:</Title>
//                     <LevelButton text='Fácil' color='easy' onClick={() => props.onLevelSelected(0.1)}/>
//                     <LevelButton text='Médio' color='medium' onClick={() => props.onLevelSelected(0.2)}/>
//                     <LevelButton text='Difícil' color='hard' onClick={() => props.onLevelSelected(0.3)}/>
//                 </Container>
//             </Frame>
//         </Modal>
//     )
// }
export {};
