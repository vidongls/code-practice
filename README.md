\*\*\* Web code....

-   Đăng ký, đăng nhập
-   Thực hành lập trình trực tuyến
-   Cho upload file
-   Tham gia các thử thách tích điểm
-   Tính điểm, rank
-   Gửi mail thông báo có challenge mới hoặc có đề thi mới

Dành cho lớp học
. Học sinh: Học sinh: Tham gia kiểm tra, thi, giải các challenge trên website
. Giáo viên: Giao bài cho học sinh, thiết kế bài thi, tự động chấm điểm theo test case.
. Gvien

-   quản lý sv trong lớp
-   Xem Thống kê của các bài thi
-   Thêm các challenge

-   Xem Thống kê chi tiết của từng User
-   Xem thống kê chi tiết của từng User trên các bài thi
-   Live code

. Deploy lên domain chạy thật.

Model :

User {
userName: String,
email: String,  
password: String,
phone: String,
avatar: String,
role: String,
challengeResolved: Array[ObjectId],
isDisable: boolean,
authorId: ObjectId,
classes:Array[ObjectId],
}

Class: {
authorId: ObjectId,
name: String,
students: [ObjectId]
}

Topic: {
challenges: [ObjectId],
title: String,
description: String,
time: Number,
authorId: ObjectId,
isUsed :boolean,
isDisable: boolean,
students: [ObjectId],
point: number
}

Challenge: {
name:String,
level: number,
content: String,
testCase: Array: {
input: String,
output: String,
},
star: number,
comment: ObjectId,
author: ObjectId,
isDisable: boolean,
usersId: [ObjectId]
}

Comment: {
content: String,
challenge :ObjectId,
author: ObjectId,
}

UserDoChallenge: {
userId: ObjectId,
challengeId: ObjectId
startTime: Date,
endTime: Date,
isResolved: boolean,
}

UserDoTopic: {
userId: ObjectId,
topicId: ObjectId
startTime: Date,
endTime: Date,
countChallengeResolve: number,
point: number
}
