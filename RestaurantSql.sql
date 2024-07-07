CREATE DATABASE RestaurantManagement;
GO

USE RestaurantManagement;
GO

CREATE TABLE Accounts (
    AccountID INT PRIMARY KEY IDENTITY(1,1),
    Username NVARCHAR(50) NOT NULL UNIQUE,
    Password NVARCHAR(255) NOT NULL,
    Role NVARCHAR(20) NOT NULL,
    PhoneNumber NVARCHAR(15) NOT NULL UNIQUE
);

CREATE TABLE Categories (
    CategoryID INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(100) NOT NULL UNIQUE,
    Description NVARCHAR(255)
);

CREATE TABLE Dishes (
    DishID INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(100) NOT NULL,
    Description NVARCHAR(500),
    Price DECIMAL(10, 2) NOT NULL,
    ImageURL NVARCHAR(500),
    CategoryID INT NOT NULL,
    FOREIGN KEY (CategoryID) REFERENCES Categories(CategoryID)
);

CREATE TABLE Orders (
    OrderID INT PRIMARY KEY IDENTITY(1,1),
    AccountID INT NOT NULL,
    OrderDate DATETIME NOT NULL,
    TotalAmount DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (AccountID) REFERENCES Accounts(AccountID)
);

CREATE TABLE OrderDetails (
    OrderDetailID INT PRIMARY KEY IDENTITY(1,1),
    OrderID INT NOT NULL,
    DishID INT NOT NULL,
    Quantity INT NOT NULL,
    UnitPrice DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID),
    FOREIGN KEY (DishID) REFERENCES Dishes(DishID)
);

CREATE TABLE Contacts (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(50) NOT NULL,
    Email NVARCHAR(50) NOT NULL,
    Phone NCHAR(10) NOT NULL,
    Message TEXT NOT NULL
);

CREATE TABLE TableBookings (
    BookingID INT PRIMARY KEY IDENTITY(1,1),
    AccountID INT,
    CustomerName NVARCHAR(100) NOT NULL,
    NumberOfPeople INT NOT NULL,
	Phone NCHAR(10) NOT NULL,
    BookingDate DATE NOT NULL,
    BookingTime TIME NOT NULL,
    Notes NVARCHAR(255)
);
GO

INSERT INTO TableBookings (AccountID, CustomerName, NumberOfPeople, Phone, BookingDate, BookingTime, Notes) VALUES
(1, N'Nguyễn Văn A', 4, '0343464516' , '2024-07-01', '18:30:00', N'Kỷ niệm ngày cưới'),
(2, N'Trần Thị B', 2, '0343464516' ,'2024-07-02', '19:00:00', N'Sinh nhật bạn gái'),
(3, N'Lê Văn C', 5, '0343464516' ,'2024-07-03', '20:00:00', N'Tiệc công ty')
GO

INSERT INTO TableBookings (AccountID, CustomerName, NumberOfPeople, Phone, BookingDate, BookingTime, Notes) VALUES
(0, N'Nguyễn Văn A', 4, '0343464516' , '2024-07-01', '18:30:00', N'Kỷ niệm ngày cưới'),
(0, N'Trần Thị B', 2, '0343464516' ,'2024-07-02', '19:00:00', N'Sinh nhật bạn gái'),
(0, N'Lê Văn C', 5, '0343464516' ,'2024-07-03', '20:00:00', N'Tiệc công ty')
GO

CREATE TABLE Payments (
    PaymentID INT PRIMARY KEY IDENTITY(1,1),
    OrderID INT,
    PaymentDate DATETIME NOT NULL,
    Amount DECIMAL(18, 2),
    PaymentMethod NVARCHAR(50),
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID)
);
GO

INSERT INTO Accounts (Username, Password, Role, PhoneNumber) VALUES ('admin', 'admin123', 'Admin', '1234567899');
INSERT INTO Accounts (Username, Password, Role, PhoneNumber) VALUES ('user1', 'password1', 'Customer', '0987654321');
INSERT INTO Accounts (Username, Password, Role, PhoneNumber) VALUES ('user2', 'password2', 'Customer', '1122334455');
INSERT INTO Accounts (Username, Password, Role, PhoneNumber) VALUES ('admin1', 'admin1', 'Admin', '03728473829');
GO

INSERT INTO Categories (Name, Description) VALUES ('Sushi', N'Sushi là món ăn truyền thống của Nhật Bản, được làm từ cơm trộn giấm kết hợp với các loại thịt, cá, hải sản, rong biển và rau củ quả tươi.');
INSERT INTO Categories (Name, Description) VALUES (N'Nước uống', N'Nước giải khát');
INSERT INTO Categories (Name, Description) VALUES (N'Đồ ăn kèm', N'Món ăn kèm được dùng theo khi thưởng thức Sushi');
GO

INSERT INTO Dishes (Name, Description, Price, ImageURL, CategoryID) VALUES (N'Chirashizushi', N'Chirashizushi còn được gọi là sushi trộn. Được phục vụ trong một bát chứa cơm sushi ở dưới và ở trên là nguyên liệu làm sushi như trứng, thanh cua, cá hồi, trứng cá hồi, trứng tôm…', 100005, 'https://japanduhoc.com/wp-content/uploads/2020/10/Cac-loai-Sushi-ngon-nhat-the-gioi-va-cach-an.jpg', 1);
INSERT INTO Dishes (Name, Description, Price, ImageURL, CategoryID) VALUES (N'Inarizushi', N'Inarizushi là món sushi dùng đậu phụ aburaage chiên giòn, bên trong chứa cơm sushi trộn với vừng, mè. Inarizushi thường dùng trong các món chay vì ngoài đậu phụ, cơm sushi và vừng, mè thì không có bất kỳ nguyên liệu mặn nào cả.', 120000, 'https://japanduhoc.com/wp-content/uploads/2020/10/1602597097_793_Cac-loai-Sushi-ngon-nhat-the-gioi-va-cach-an.jpg', 1);
INSERT INTO Dishes (Name, Description, Price, ImageURL, CategoryID) VALUES (N'Makizushi', N'Makizushi là một loại sushi truyền thống của Nhật Bản, còn được gọi là Futomaki. Được làm bằng cơm sushi (cơm trộn giấm), và các nguyên liệu như thanh cua, cá hồi, trứng, dưa leo, cá ngừ… cuộn trong lá rong biển khô. Người Nhật thường làm makizushi dành cho những buổi sự kiện ngoài trời hoặc dã ngoại hay picnic.', 110000, 'https://japanduhoc.com/wp-content/uploads/2020/10/1602597099_617_Cac-loai-Sushi-ngon-nhat-the-gioi-va-cach-an.jpg', 1);
INSERT INTO Dishes (Name, Description, Price, ImageURL, CategoryID) VALUES (N'Tekkamaki', N'Tekkamaki là một loại Hosomaki chứa đầy cá ngừ, đôi khi có trộn cả hành lá. Có một loại Hosomaki cá ngừ khác là Tsunamayomaki, gồm nhân là cá ngừ đóng hộp trộn sốt mayonaise.', 140000, 'https://japanduhoc.com/wp-content/uploads/2020/10/1602597104_704_Cac-loai-Sushi-ngon-nhat-the-gioi-va-cach-an.jpg', 1);
INSERT INTO Dishes (Name, Description, Price, ImageURL, CategoryID) VALUES (N'Hosomaki', N'Hosomaki cũng giống như Makizushi, nhưng cuộn nhỏ hơn và phần nhân thường chỉ gồm cơm sushi và một nguyên liệu khác như cá hồi, thanh cua, dưa leo, trứng, quả bơ… Hosomaki cũng được mang theo trong những buổi dã ngoại, picnic…', 130000, 'https://japanduhoc.com/wp-content/uploads/2020/10/1602597101_361_Cac-loai-Sushi-ngon-nhat-the-gioi-va-cach-an.jpg', 1);
INSERT INTO Dishes (Name, Description, Price, ImageURL, CategoryID) VALUES (N'Ehōmaki', N'Ehōmaki là một loại cuộn sushi dài với 7 thành phần. Thành phần gồm cơm sushi và nhân là thanh cua, cá ngừ, cá hồi, trứng, lươn.. được cuốn bên ngoài là lá rong biển khô. Ehoumaki được ăn trong Lễ hội Ném đậu – Setsubun. Mang ý nghĩa may mắn, hạnh phúc, giải trừ tai họa.', 150000, 'https://japanduhoc.com/wp-content/uploads/2020/10/1602597109_744_Cac-loai-Sushi-ngon-nhat-the-gioi-va-cach-an.jpg', 1);
INSERT INTO Dishes (Name, Description, Price, ImageURL, CategoryID) VALUES (N'Temaki sushi', N'Temaki là một loại sushi được cuốn thành hình chiếc nón, với phần nhân sushi vượt ra ngoài rong biển trông rất đẹp mắt. Temaki sushi thường được ăn bằng tay, không dùng đũa để gắp vì nhân sẽ rớt ra ngoài.', 155000, 'https://japanduhoc.com/wp-content/uploads/2020/10/1602597112_300_Cac-loai-Sushi-ngon-nhat-the-gioi-va-cach-an.jpg', 1);
INSERT INTO Dishes (Name, Description, Price, ImageURL, CategoryID) VALUES (N'Wasabi', N'Là một loại gia vị cay được biết, giúp làm sáng vị của hải sản và tảo thêm hương vị đặc trưng.', 5000, 'https://www.wired.com/wp-content/uploads/2015/04/wasabi-ft1.jpg', 3);
INSERT INTO Dishes (Name, Description, Price, ImageURL, CategoryID) VALUES (N'Gừng đỏ', N'Ðược cắt thành lát mỏng và ngâm trong giấm. Nó được dùng để làm sạch miệng sau mỗi miếng Sashimi và tạo sự tươi mát.', 5000, 'https://th.bing.com/th/id/OIP.8aVjkXjvkOcNBUz4QHa2HQAAAA?w=442&h=442&rs=1&pid=ImgDetMain', 3);
INSERT INTO Dishes (Name, Description, Price, ImageURL, CategoryID) VALUES (N'Sốt tương', N'Sốt tương (soy sauce) thường được cung cấp kèm, và bạn có thể ngâm miếng Sashimi vào sốt này để thêm hương vị mặn và đậm đà.', 5000, 'https://7cad390533514c32acc8-75d23ce06fcfaf780446d85d50c33f7b.ssl.cf6.rackcdn.com/sc/1681363095-normal-Tripotassium-Glycyrrhizinate.jpg', 3);
INSERT INTO Dishes (Name, Description, Price, ImageURL, CategoryID) VALUES (N'Salad trái cây', N'Một phần nhỏ của salad trái cây hoặc salad rau sống có thể đi kèm với Sashimi để tạo sự cân đối và cung cấp thêm chất xơ và vitamin.', 10000, 'https://th.bing.com/th/id/OIP.xw7wC6ez7rHn8NNEGzYWdgHaE8?rs=1&pid=ImgDetMain', 3);
GO

CREATE TABLE Carts (
    CartID INT PRIMARY KEY IDENTITY(1,1),
    DishID INT NOT NULL,
    AccountID INT NOT NULL,
    Price DECIMAL(18, 2),
    Quantity INT,
    FOREIGN KEY (AccountID) REFERENCES Accounts(AccountID)
    FOREIGN KEY (DishID) REFERENCES Dishes(DishID)
);

INSERT INTO Carts (DishID, AccountID, Price, Quantity) VALUES (1, 1, 100000, 1);
INSERT INTO Carts (DishID, AccountID, Price, Quantity) VALUES (24, 3, 10000, 1);
INSERT INTO Carts (DishID, AccountID, Price, Quantity) VALUES (5, 3, 110000, 1);
INSERT INTO Carts (DishID, AccountID, Price, Quantity) VALUES (4, 3, 120000, 2);
INSERT INTO Carts (DishID, AccountID, Price, Quantity) VALUES (6, 3, 140000, 1);
GO

INSERT INTO Orders (OrderDate, AccountID, TotalAmount, Status)
VALUES (GETDATE(), 1, 11.98, 'Pending');
GO
