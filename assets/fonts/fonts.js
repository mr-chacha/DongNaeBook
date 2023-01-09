const [isReady, setIsReady] = useEffect(false);

useEffect(async () => {
  await Font.loadAsync({
    fredoka: require('./assets/fonts/FredokaOne-Regular.ttf'),
    cafe24: require('./assets/fonts/Cafe24Ssurround.ttf'),
  });
  setIsReady(true);
}, []);
