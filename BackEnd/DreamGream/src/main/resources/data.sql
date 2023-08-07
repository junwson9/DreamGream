insert into category (category_name) values ('Travel');
insert into category (category_name) values ('Health');
insert into category (category_name) values ('Learning');
insert into category (category_name) values ('Culture');
insert into category (category_name) values ('Love');
insert into category (category_name) values ('Food');
insert into category (category_name) values ('Shopping');
insert into category (category_name) values ('Work');
insert into category (category_name) values ('etc');


Insert into member (email, nickname, provider, role)
values
    ('ssafy3@ssafy.com', '하하하2', 'KAKAO', 'ROLE_USER'),
    ('ssafy3@ssafy.com', '하하하3', 'KAKAO', 'ROLE_GUEST'),
    ('ssafy4@ssafy.com', '하하하4', 'KAKAO', 'ROLE_GUEST'),
    ('ssafy5@ssafy.com', '하하하5', 'KAKAO', 'ROLE_USER');

/* 게시글 */
INSERT INTO post (ACHIEVED_DATE, ACHIEVEMENT_CONTENT, ACHIEVEMENT_IMG, AI_IMG, CELEBRATE_CNT, CHEER_CNT, CONTENT, CREATED_DATE, IS_ACHIEVED, IS_DISPLAY, MODIFIED_DATE, TITLE, CATEGORY_ID, MEMBER_ID) VALUES ('2021-01-01', 'Congratulations! You have achieved your goal!', 'achievement_pic_1.png', 'ai_pic_1.png', 10, 5, 'You worked hard and achieved your goal. Congratulations!', '2021-01-01 12:00:00', 1, 0, '2021-01-01 18:00:00', 'My first achievement', 1, 1);
INSERT INTO post (ACHIEVED_DATE, ACHIEVEMENT_CONTENT, ACHIEVEMENT_IMG, AI_IMG, CELEBRATE_CNT, CHEER_CNT, CONTENT, CREATED_DATE, IS_ACHIEVED, IS_DISPLAY, MODIFIED_DATE, TITLE, CATEGORY_ID, MEMBER_ID) VALUES ('2021-02-14', 'Happy Valentines Day!', 'valentines_pic.png', 'ai_pic_2.png', 50, 30, 'Wishing you a wonderful day full of love and happiness!', '2021-02-14 09:00:00', 0, 1, '2021-02-14 20:00:00', 'Happy Valentine''s Day', 2, 1);
INSERT INTO post (ACHIEVED_DATE, ACHIEVEMENT_CONTENT, ACHIEVEMENT_IMG, AI_IMG, CELEBRATE_CNT, CHEER_CNT, CONTENT, CREATED_DATE, IS_ACHIEVED, IS_DISPLAY, MODIFIED_DATE, TITLE, CATEGORY_ID, MEMBER_ID) VALUES ('2021-03-01', 'Happy March!', 'march_pic.png', 'ai_pic_3.png', 20, 15, 'Wishing you a wonderful start to the new month!', '2021-03-01 00:00:00', 0, 1, '2021-03-01 06:00:00', 'Hello, March', 3, 1);
INSERT INTO post (ACHIEVED_DATE, ACHIEVEMENT_CONTENT, ACHIEVEMENT_IMG, AI_IMG, CELEBRATE_CNT, CHEER_CNT, CONTENT, CREATED_DATE, IS_ACHIEVED, IS_DISPLAY, MODIFIED_DATE, TITLE, CATEGORY_ID, MEMBER_ID) VALUES ('2021-04-22', 'Happy Earth Day!', 'earth_day_pic.png', 'ai_pic_4.png', 100, 70, 'Let''s protect our planet and make our world a better place for future generations!', '2021-04-22 12:00:00', 1, 1, '2021-04-22 21:00:00', 'Make Every Day Earth Day', 4, 1);
INSERT INTO post (ACHIEVED_DATE, ACHIEVEMENT_CONTENT, ACHIEVEMENT_IMG, AI_IMG, CELEBRATE_CNT, CHEER_CNT, CONTENT, CREATED_DATE, IS_ACHIEVED, IS_DISPLAY, MODIFIED_DATE, TITLE, CATEGORY_ID, MEMBER_ID) VALUES ('2021-05-05', 'Happy Childrens Day!', 'childrens_day_pic.png', 'ai_pic_5.png', 80, 50, 'Thank you for always being our source of laughter and joy. Happy Children''s Day!', '2021-05-05 07:00:00', 1, 0, '2021-05-05 18:00:00', 'Happy Children''s Day', 5, 1);
INSERT INTO post (ACHIEVED_DATE, ACHIEVEMENT_CONTENT, ACHIEVEMENT_IMG, AI_IMG, CELEBRATE_CNT, CHEER_CNT, CONTENT, CREATED_DATE, IS_ACHIEVED, IS_DISPLAY, MODIFIED_DATE, TITLE, CATEGORY_ID, MEMBER_ID) VALUES ('2021-01-01', 'Congratulations! You have achieved your goal!', 'achievement_pic_1.png', 'ai_pic_1.png', 10, 5, 'You worked hard and achieved your goal. Congratulations!', '2021-01-01 12:00:00', 1, 0, '2021-01-01 18:00:00', 'My first achievement', 1, 2);
INSERT INTO post (ACHIEVED_DATE, ACHIEVEMENT_CONTENT, ACHIEVEMENT_IMG, AI_IMG, CELEBRATE_CNT, CHEER_CNT, CONTENT, CREATED_DATE, IS_ACHIEVED, IS_DISPLAY, MODIFIED_DATE, TITLE, CATEGORY_ID, MEMBER_ID) VALUES ('2021-02-14', 'Happy Valentines Day!', 'valentines_pic.png', 'ai_pic_2.png', 50, 30, 'Wishing you a wonderful day full of love and happiness!', '2021-02-14 09:00:00', 0, 1, '2021-02-14 20:00:00', 'Happy Valentine''s Day', 2, 2);
INSERT INTO post (ACHIEVED_DATE, ACHIEVEMENT_CONTENT, ACHIEVEMENT_IMG, AI_IMG, CELEBRATE_CNT, CHEER_CNT, CONTENT, CREATED_DATE, IS_ACHIEVED, IS_DISPLAY, MODIFIED_DATE, TITLE, CATEGORY_ID, MEMBER_ID) VALUES ('2021-03-01', 'Happy March!', 'march_pic.png', 'ai_pic_3.png', 20, 15, 'Wishing you a wonderful start to the new month!', '2021-03-01 00:00:00', 0, 1, '2021-03-01 06:00:00', 'Hello, March', 3, 1);
INSERT INTO post (ACHIEVED_DATE, ACHIEVEMENT_CONTENT, ACHIEVEMENT_IMG, AI_IMG, CELEBRATE_CNT, CHEER_CNT, CONTENT, CREATED_DATE, IS_ACHIEVED, IS_DISPLAY, MODIFIED_DATE, TITLE, CATEGORY_ID, MEMBER_ID) VALUES ('2021-04-22', 'Happy Earth Day!', 'earth_day_pic.png', 'ai_pic_4.png', 100, 70, 'Let''s protect our planet and make our world a better place for future generations!', '2021-04-22 12:00:00', 0, 1, '2021-04-22 21:00:00', 'Make Every Day Earth Day', 4, 2);
INSERT INTO post (ACHIEVED_DATE, ACHIEVEMENT_CONTENT, ACHIEVEMENT_IMG, AI_IMG, CELEBRATE_CNT, CHEER_CNT, CONTENT, CREATED_DATE, IS_ACHIEVED, IS_DISPLAY, MODIFIED_DATE, TITLE, CATEGORY_ID, MEMBER_ID) VALUES ('2021-05-05', 'Happy Childrens Day!', 'childrens_day_pic.png', 'ai_pic_5.png', 80, 50, 'Thank you for always being our source of laughter and joy. Happy Children''s Day!', '2021-05-05 07:00:00', 0, 0, '2021-05-05 18:00:00', 'Happy Children''s Day', 5, 2);

-- /* 좋아요 */
-- INSERT INTO MEMBER_POST_CELEBRATE (member_id, post_id)
-- VALUES (2, 1);
--
-- INSERT INTO MEMBER_POST_CELEBRATE (member_id, post_id)
-- VALUES (3, 1);
--
-- INSERT INTO MEMBER_POST_CELEBRATE (member_id, post_id)
-- VALUES (5, 1);
--
-- INSERT INTO MEMBER_POST_CELEBRATE (member_id, post_id)
-- VALUES (1, 2);
--
-- INSERT INTO MEMBER_POST_CELEBRATE (member_id, post_id)
-- VALUES (4, 2);
--
-- /* 응원해요 */
-- INSERT INTO MEMBER_POST_CHEER (member_id, post_id)
-- VALUES (2, 1);
--
-- INSERT INTO MEMBER_POST_CHEER (member_id, post_id)
-- VALUES (3, 1);
--
-- INSERT INTO MEMBER_POST_CHEER (member_id, post_id)
-- VALUES (5, 1);
--
-- INSERT INTO MEMBER_POST_CHEER (member_id, post_id)
-- VALUES (1, 2);
--
-- INSERT INTO MEMBER_POST_CHEER (member_id, post_id)
-- VALUES (4, 2);