// import AsyncStorage from "@react-native-async-storage/async-storage"
// import { Alert } from "react-native"
// import { boardType } from "./logic"

// const saveItem = async (key: string, value: Object , ErrMsg: string) => {
//     try {
//       await AsyncStorage.setItem(key, JSON.stringify(value))
//       return true
//     } catch (err: any) {
//       Alert.alert(ErrMsg, err)
//       return false
//     }
// }
// const loadItem = async (key: string, callback: Function, ErrMsg: string) => {
//     try {
//         const ans = await AsyncStorage.getItem(key)
//         if (ans !== null) callback(JSON.parse(ans))
//     } catch (err: any){
//         Alert.alert(ErrMsg, err)
//         return false
//     }
//     return true
// }

// const deleteItem = async (key: string, ErrMsg: string) => {
//     try {
//         await AsyncStorage.removeItem(key)
//         return true
//     } catch (err: any) {
//         Alert.alert(ErrMsg, err)
//         return false
//     }
// }

// export const saveGame = async (data: {board: boardType, mineDensity: number}) => await saveItem('board', data, 'Erro ao salvar o jogo!')

// export const saveSetting = async (setting: Object) =>  await saveItem('setting', setting, 'Erro ao salvar as configurações!')

// export const loadData = async (callbackGame: Function, callbackSetting: Function) => {
//     const boardLoaded = await loadItem('board', callbackGame, 'Erro ao carregar o jogo!')
//     const settingsLoaded = await loadItem('setting', callbackSetting, 'Erro ao carregar as configurações!')
//     return boardLoaded && settingsLoaded
// }

// export const deleteGame = async () => await deleteItem('board', 'Erro ao deletar o jogo!')

// export const deleteSetting = async () => await deleteItem('setting', 'Erro ao deletar as configurações!')
export {};
