
import { Alert } from 'react-native';
import { useTranslation } from 'react-i18next';


const ConfirmDelete = ({deletePharmacie, showModel, setShowModel}) => {
  const { t } = useTranslation();

    return Alert.alert(
      t('sure'),
      t('CofimrDelete'),
      [
        // The "Yes" button
        {
          text: t('Yes'),
          onPress: () => {
            deletePharmacie(showModel)
            setShowModel(false);
          },
        },
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: t('No'),
          onPress: ()=>{
            setShowModel(false)
          }
        },
      ]
    );
  };

  export default ConfirmDelete