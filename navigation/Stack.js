import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Detail from '../screen/Detail';

const NativeStack = createNativeStackNavigator();

export default function Stack() {
  return (
    <NativeStack.Navigator>
      <NativeStack.Screen
        name='Detail'
        component={Detail}
      />
    </NativeStack.Navigator>
  );
}
