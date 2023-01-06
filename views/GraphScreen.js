import React from "react";
import { Defs, LinearGradient, Stop } from "react-native-svg";
import { LineChart, Grid } from "react-native-svg-charts";

const GraphScreen = ({ route }) => {
  const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80];
  console.log("ROUR ", route);

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
          {`${data[5]}ºC`}
        </Text>
      </G>
      <G x={75 / 2}>
        <Line y1={50 + 40} y2={y(data[5])} stroke={"grey"} strokeWidth={2} />
        <Circle
          cy={y(data[5])}
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

  return (
    <LineChart
      style={{ height: 200 }}
      data={data}
      contentInset={{ top: 20, bottom: 20 }}
      svg={{
        strokeWidth: 2,
        stroke: "url(#gradient)",
      }}
    >
      <Grid />
      <Gradient />
    </LineChart>
  );
};

export default GraphScreen;
