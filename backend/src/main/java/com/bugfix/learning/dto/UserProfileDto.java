package com.bugfix.learning.dto;

public record UserProfileDto(
    Long id,
    String username,
    String fullName,
    String avatar,
    String role,
    String bio
) {}
