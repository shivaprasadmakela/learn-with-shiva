package com.bugfix.learning.service;

import com.bugfix.learning.dto.UserProfileDto;
import com.bugfix.learning.entity.UserProfile;
import com.bugfix.learning.repository.UserProfileRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserProfileService {

    private final UserProfileRepository userProfileRepository;

    public UserProfileService(UserProfileRepository userProfileRepository) {
        this.userProfileRepository = userProfileRepository;
    }

    public UserProfileDto getProfile(String username) {
        UserProfile profile = userProfileRepository.findByUsername(username)
                .orElseGet(() -> {
                    // Create default profile if none exists
                    UserProfile defaultProfile = new UserProfile(
                            null,
                            username,
                            "Alex Learner",
                            "👨‍💻",
                            "Fullstack Developer Apprentice",
                            "Learning React & Spring Boot to build modern web applications."
                    );
                    return userProfileRepository.save(defaultProfile);
                });

        return new UserProfileDto(
                profile.getId(),
                profile.getUsername(),
                profile.getFullName(),
                profile.getAvatar(),
                profile.getRole(),
                profile.getBio()
        );
    }

    @Transactional
    public UserProfileDto updateProfile(String username, UserProfileDto dto) {
        UserProfile profile = userProfileRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Profile not found for user: " + username));

        profile.setFullName(dto.fullName());
        profile.setAvatar(dto.avatar());
        profile.setRole(dto.role());
        profile.setBio(dto.bio());

        UserProfile updated = userProfileRepository.save(profile);
        return new UserProfileDto(
                updated.getId(),
                updated.getUsername(),
                updated.getFullName(),
                updated.getAvatar(),
                updated.getRole(),
                updated.getBio()
        );
    }
}
