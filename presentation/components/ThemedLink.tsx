import React from 'react';
import { TouchableOpacity, Text, TouchableOpacityProps } from 'react-native';
import { Link } from 'expo-router';

interface ThemedLinkProps extends TouchableOpacityProps {
    href: any;
    text: string;
    linkText: string;
}

export const ThemedLink = ({ href, text, linkText, className = '', ...props }: ThemedLinkProps) => {
    return (
        <Link href={href} asChild>
            <TouchableOpacity className={`flex-row justify-center mt-4 ${className}`} {...props}>
                <Text className="text-spotify-light-gray mr-1">{text}</Text>
                <Text className="text-white font-bold">{linkText}</Text>
            </TouchableOpacity>
        </Link>
    );
};
