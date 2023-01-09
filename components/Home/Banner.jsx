import React from "react";
import styled from "@emotion/native";
import Swiper from "react-native-swiper";
import { TouchableOpacity } from "react-native";

export default function Banner() {
  return (
    <BannerView>
      <Swiper autoplay>
        <TouchableOpacity>
          <BannerImage source={require("../image/a1.png")} />
        </TouchableOpacity>
        <TouchableOpacity>
          <BannerImage source={require("../image/a4.png")} />
        </TouchableOpacity>
        <TouchableOpacity>
          <BannerImage source={require("../image/a3.png")} />
        </TouchableOpacity>
      </Swiper>
    </BannerView>
  );
}

const BannerImage = styled.Image`
  width: 100%;
  /* height: 100%; */
`;

const BannerView = styled.View`
  height: 250px;
`;
