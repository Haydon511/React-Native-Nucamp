import {useEffect, useRef} from 'react';
import {Text, View, Animated} from 'react-native'; 
import {Card} from 'react-native-elements'; 
import { useSelector } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from '../components/LoadingComponents';

const FeaturedItem= (props) =>{
    const {item} = (props); 

    if (props.isLoading) {
        return (
            <Loading />
        )
    }
    if (props.errMsg) {
        return (
            <View>
                <Text> {props.errMsg} </Text>
            </View>
        )
    }
    if (item) {
        return (
            <Card containerStyle={{padding:0}}>
                <Card.Image source={{uri: baseUrl + item.image }}>
                    <View
                        style={{justifyContent: 'center', flex: 1}}>
                            <Text style={{color: 'white', textAlign: 'center', fontSize: 20}}>
                                {item.name}
                            </Text>
                    </View>
                </Card.Image>
                    <Text style={{margin: 20}}>{item.description}</Text>
            </Card>
        )
    }
        return <View />
}


const HomeScreen = () => {
    const campsites = useSelector((state) => state.campsites);
    const promotions = useSelector((state) => state.promotions); 
    const partners = useSelector((state) => state.partners); 
    const scaleValue = useRef(new Animated.Value(0)).current; 
    const scaleAnimation = Animated.timing(scaleValue, {
        toValue: 1, 
        duration: 1500, 
        useNativeDriver: true
    })

    const featCampsite = campsites.campsitesArray.find((item) => item.featured);
    const featPromotion = promotions.promotionsArray.find((item) => item.featured); 
    const featPartner = partners.partnersArray.find((item) => item.featured);

    useEffect(()=>{ 
        scaleAnimation.start();
    }, []); 
        

    return (
        <ScrollView>
            <FeaturedItem 
                item = {featCampsite} 
                isLoading = {campsites.isLoading}
                errMsg = {campsites.errMess}
            />
            <FeaturedItem 
                item = {featPromotion} 
                isLoading = {promotions.isLoading}
                errMsg = {campsites.errMess}
            />
            <FeaturedItem 
                item = {featPartner} 
                isLoading = {partners.isLoading}
                errMsg = {partners.errMess}
            />
        </ScrollView>
    );

};

export default HomeScreen;