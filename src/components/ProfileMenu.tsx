import { Avatar, Button, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text, Icon } from '@chakra-ui/react';
import { ChevronDownIcon, AtSignIcon } from '@chakra-ui/icons';

export default function ProfileMenu({ email, onLogout }: { email?: string; onLogout: () => void }) {
  const nameFallback = email ? email.split('@')[0] : 'User';
  return (
    <Menu>
      <MenuButton as={Button} variant="ghost" rightIcon={<ChevronDownIcon />}
        display="flex" alignItems="center" gap={2}>
        <Icon as={AtSignIcon} />
        <Avatar name={nameFallback} size="sm" />
        <Text display={{ base: 'none', md: 'block' }} maxW="24ch" isTruncated>
          {email || 'Profile'}
        </Text>
      </MenuButton>
      <MenuList>
        <MenuItem>Profile</MenuItem>
        <MenuItem>Settings</MenuItem>
        <MenuDivider />
        <MenuItem color="red.500" onClick={onLogout}>Logout</MenuItem>
      </MenuList>
    </Menu>
  );
}


