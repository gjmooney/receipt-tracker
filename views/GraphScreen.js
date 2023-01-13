import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Defs, LinearGradient, Stop } from "react-native-svg";
import { LineChart, Grid, XAxis, YAxis } from "react-native-svg-charts";

const GraphScreen = ({ route }) => {
  const history = route.params;
  const dataT = [
    50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80,
  ];

  let priceData = [];
  let dateData = [];

  history.map((item) => {
    // unary + to convert string price to number
    priceData.push(+item.price);
    dateData.push(item.date);
  });

  console.log("Price: ", priceData);
  console.log("DATE: ", dateData);

  /**
   * Both below functions should preferably be their own React Components
   */

  const HorizontalLine = ({ y }) => (
    <Line
      key={"zero-axis"}
      x1={"0%"}
      x2={"100%"}
      y1={y(50)}
      y2={y(50)}
      stroke={"grey"}
      strokeDasharray={[4, 8]}
      strokeWidth={2}
    />
  );

  const Tooltip = ({ x, y }) => (
    <G
      x={x(5) - 75 / 2}
      key={"tooltip"}
      onPress={() => console.log("tooltip clicked")}
    >
      <G y={50}>
        <Rect
          height={40}
          width={75}
          stroke={"grey"}
          fill={"white"}
          ry={10}
          rx={10}
        />
        <Text
          x={75 / 2}
          dy={20}
          alignmentBaseline={"middle"}
          textAnchor={"middle"}
          stroke={"rgb(134, 65, 244)"}
        >
          {`${dataT[5]}ºC`}
        </Text>
      </G>
      <G x={75 / 2}>
        <Line y1={50 + 40} y2={y(dataT[5])} stroke={"grey"} strokeWidth={2} />
        <Circle
          cy={y(dataT[5])}
          r={6}
          stroke={"rgb(134, 65, 244)"}
          strokeWidth={2}
          fill={"white"}
        />
      </G>
    </G>
  );

  const Gradient = () => (
    <Defs key={"gradient"}>
      <LinearGradient id={"gradient"} x1={"0"} y={"0%"} x2={"100%"} y2={"0%"}>
        <Stop offset={"0%"} stopColor={"rgb(134, 65, 244)"} />
        <Stop offset={"100%"} stopColor={"rgb(66, 194, 244)"} />
      </LinearGradient>
    </Defs>
  );

  const axesSvg = { fontSize: 10, fill: "grey" };
  const verticalContentInset = { top: 10, bottom: 10 };
  const xAxisHeight = 30;

  return (
    <View style={{ height: 200, padding: 20, flexDirection: "row" }}>
      <YAxis
        data={priceData}
        style={{ marginBottom: xAxisHeight }}
        contentInset={verticalContentInset}
        svg={axesSvg}
        formatLabel={(value) => `€${value}`}
      />
      <View style={{ flex: 1, marginLeft: 10 }}>
        <LineChart
          style={{ flex: 1 }}
          data={priceData}
          contentInset={verticalContentInset}
          svg={{ stroke: "rgb(134, 65, 244)" }}
        >
          <Grid />
        </LineChart>
        <XAxis
          style={{ marginHorizontal: -10, height: xAxisHeight }}
          data={priceData}
          formatLabel={(value, index) =>
            new Date(dateData[index]).toLocaleDateString()
          }
          contentInset={{ left: 30, right: 30 }}
          svg={axesSvg}
        />
      </View>
    </View>
  );
};

export default GraphScreen;
