import React from "react";
import { View, Text } from "react-native";
import { Image } from "expo-image";
import { useQuery } from "@tanstack/react-query";
import { Stack, useLocalSearchParams, Link } from "expo-router";

const MemberScreen = () => {
  const { memberId } = useLocalSearchParams();

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
        <View className="p-4 gap-y-4 align-center">
          <Image className="h-64" source={member.depiction.imageUrl} contentFit="contain" />
          <Link href={member.officialWebsiteUrl} className="self-center">
            <Text className="text-lg font-bold mb-4 color-blue-700">
              {member.officialWebsiteUrl}
            </Text>
          </Link>
        </View>
      ) : (
        <Text className="text-lg">...</Text>
      )}
    </View>
  );
};

export default MemberScreen;
