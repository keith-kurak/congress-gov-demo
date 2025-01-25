import React from "react";
import { View, Text, Pressable } from "react-native";
import { Image } from "expo-image";
import { useQuery } from "@tanstack/react-query";
import { Stack, useLocalSearchParams, Link } from "expo-router";
import { useRateMyCongressperson } from "@/data/hooks/useRateMyCongressperson";

const MemberScreen = () => {
  const { memberId } = useLocalSearchParams();

  const { rate, rating } = useRateMyCongressperson(memberId as string);

  const query = useQuery({
    queryKey: [`member/${memberId}`],
    queryFn: async () => {
      const response = await fetch(`/api/member/${memberId}`, {
        method: "GET",
      });
      return await response.json();
    },
  });

  const member = query.data || undefined;

  return (
    <View className="flex-1 p-4 align-center">
      <Stack.Screen
        options={{ title: member ? `${member.directOrderName}` : "..." }}
      />
      {member ? (
        <View className="p-4 gap-y-4 align-center self-center">
          <Image
            className="h-64"
            source={member.depiction.imageUrl}
            contentFit="contain"
          />
          <Link href={member.officialWebsiteUrl} className="self-center">
            <Text className="text-lg font-bold mb-4 color-blue-700">
              {member.officialWebsiteUrl}
            </Text>
          </Link>
            <View className="align-center gap-y-4 self-center">
            <Pressable
              onPress={() => rate(0)}
              className={`p-2 border-2 border-red-500 rounded ${
              rating === 0 ? "bg-red-500" : ""
              }`}
            >
              <Text className={`text-center ${rating === 0 ? "text-white" : "text-black"}`}>Sucks</Text>
            </Pressable>
            <Pressable
              onPress={() => rate(1)}
              className={`p-2 border-2 border-yellow-500 rounded ${
              rating === 1 ? "bg-yellow-500" : ""
              }`}
            >
              <Text className={`text-center ${rating === 1 ? "text-white" : "text-black"}`}>Meh</Text>
            </Pressable>
            <Pressable
              onPress={() => rate(2)}
              className={`p-2 border-2 border-green-500 rounded ${
              rating === 2 ? "bg-green-500" : ""
              }`}
            >
              <Text className={`text-center ${rating === 2 ? "text-white" : "text-black"}`}>Doesn't Suck</Text>
            </Pressable>
            </View>
        </View>
      ) : (
        <Text className="text-lg">...</Text>
      )}
    </View>
  );
};

export default MemberScreen;
