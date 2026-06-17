package com.bugfix.learning.controller;

import com.bugfix.learning.dto.UserProfileDto;
import com.bugfix.learning.service.UserProfileService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
public class UserProfileController {

    private final UserProfileService userProfileService;
    private static final String DEFAULT_USER = "learner_1";

    public UserProfileController(UserProfileService userProfileService) {
        this.userProfileService = userProfileService;
    }

    @GetMapping
    public ResponseEntity<UserProfileDto> getProfile() {
        return ResponseEntity.ok(userProfileService.getProfile(DEFAULT_USER));
    }

    @PutMapping
    public ResponseEntity<UserProfileDto> updateProfile(@RequestBody UserProfileDto userProfileDto) {
        return ResponseEntity.ok(userProfileService.updateProfile(DEFAULT_USER, userProfileDto));
    }
}
